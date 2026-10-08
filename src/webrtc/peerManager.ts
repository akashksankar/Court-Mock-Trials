import Peer, { DataConnection, MediaConnection } from 'peerjs';
import { CourtEvent, Participant } from '../types/courtroom';

type EventListener = (event: CourtEvent) => void;

export class PeerManager {
  private peer: Peer | null = null;
  private connections: Map<string, DataConnection> = new Map();
  private mediaCalls: Map<string, MediaConnection> = new Map();
  private hostConnection: DataConnection | null = null;
  private listeners: Set<EventListener> = new Set();
  public myPeerId: string = '';
  public isHost: boolean = false;
  public roomCode: string = '';

  public onEvent(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(event: CourtEvent) {
    this.listeners.forEach((fn) => fn(event));
  }

  private cleanupPeer() {
    if (this.peer) {
      try {
        this.peer.removeAllListeners();
        if (!this.peer.destroyed) {
          this.peer.destroy();
        }
      } catch (e) {
        console.warn('Error destroying existing peer:', e);
      }
      this.peer = null;
    }
  }

  // Initialize PeerJS for host (Judge)
  public async initHost(roomCode: string, _myName: string): Promise<string> {
    this.cleanupPeer();

    this.isHost = true;
    this.roomCode = roomCode;
    const cleanRoom = roomCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const preferredPeerId = `cv-${cleanRoom}-judge`;

    return new Promise((resolve) => {
      let resolved = false;

      const createPeerWithId = (idToTry: string, isFallback: boolean) => {
        try {
          const peer = new Peer(idToTry, { debug: 0 });
          this.peer = peer;

          peer.on('open', (assignedId) => {
            if (!resolved) {
              resolved = true;
              this.myPeerId = assignedId;
              resolve(assignedId);
            }
          });

          peer.on('error', (err: any) => {
            console.warn(`PeerJS Host Error (ID: ${idToTry}):`, err?.type || err?.message || err);

            // Handle ID collision (e.g., previous socket still disconnecting or ID taken by another host)
            if (!resolved && !isFallback && (err?.type === 'unavailable-id' || err?.message?.includes('taken'))) {
              this.cleanupPeer();
              const fallbackId = `cv-${cleanRoom}-judge-${Math.random().toString(36).substring(2, 7)}`;
              console.log('ID taken, retrying host initialization with fallback ID:', fallbackId);
              createPeerWithId(fallbackId, true);
              return;
            }

            if (!resolved) {
              resolved = true;
              this.myPeerId = idToTry;
              resolve(idToTry);
            }
          });

          peer.on('connection', (conn) => {
            this.handleIncomingDataConnection(conn);
          });

          peer.on('call', (call) => {
            call.answer(); // Answer incoming audio/video calls
            this.mediaCalls.set(call.peer, call);
          });
        } catch (e) {
          console.error('PeerJS init failed:', e);
          if (!resolved) {
            resolved = true;
            this.myPeerId = idToTry;
            resolve(idToTry);
          }
        }
      };

      createPeerWithId(preferredPeerId, false);

      // Safety timeout
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          this.myPeerId = preferredPeerId;
          resolve(preferredPeerId);
        }
      }, 3000);
    });
  }

  // Initialize PeerJS for participant (Student/Spectator)
  public async initParticipant(roomCode: string, participant: Participant): Promise<boolean> {
    this.cleanupPeer();

    this.isHost = false;
    this.roomCode = roomCode;
    const cleanRoom = roomCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const targetHostId = `cv-${cleanRoom}-judge`;

    return new Promise((resolve) => {
      let resolved = false;

      try {
        const peer = new Peer({ debug: 0 });
        this.peer = peer;

        peer.on('open', (id) => {
          this.myPeerId = id;

          // Connect to Host DataChannel
          try {
            const conn = peer.connect(targetHostId, {
              metadata: { participant },
            });

            this.hostConnection = conn;

            conn.on('open', () => {
              this.connections.set(targetHostId, conn);
              // Send JOIN message to host
              conn.send({
                type: 'PARTICIPANT_JOINED',
                participant: { ...participant, peerId: id },
              } as CourtEvent);
              if (!resolved) {
                resolved = true;
                resolve(true);
              }
            });

            conn.on('data', (data: unknown) => {
              if (data && typeof data === 'object') {
                this.notifyListeners(data as CourtEvent);
              }
            });

            conn.on('close', () => {
              this.hostConnection = null;
            });

            conn.on('error', (err) => {
              console.warn('Host connection error:', err);
              if (!resolved) {
                resolved = true;
                resolve(false);
              }
            });
          } catch (connErr) {
            console.warn('Error attempting connection to host:', connErr);
            if (!resolved) {
              resolved = true;
              resolve(false);
            }
          }
        });

        peer.on('error', (err) => {
          console.warn('PeerJS participant error:', err);
          if (!resolved) {
            resolved = true;
            resolve(false);
          }
        });

        // Safety timeout for fallback UI simulation
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve(true);
          }
        }, 3000);
      } catch (e) {
        console.error('Participant connect failed:', e);
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      }
    });
  }

  private handleIncomingDataConnection(conn: DataConnection) {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);
    });

    conn.on('data', (data: unknown) => {
      if (data && typeof data === 'object') {
        const event = data as CourtEvent;
        this.notifyListeners(event);

        // If host receives message, rebroadcast to all other connected peers
        if (this.isHost) {
          this.broadcast(event, conn.peer);
        }
      }
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      this.notifyListeners({
        type: 'PARTICIPANT_LEFT',
        participantId: conn.peer,
      });
    });
  }

  // Broadcast event to connected peers
  public broadcast(event: CourtEvent, excludePeerId?: string) {
    this.notifyListeners(event); // Local execution

    if (this.isHost) {
      this.connections.forEach((conn, peerId) => {
        if (peerId !== excludePeerId && conn.open) {
          try {
            conn.send(event);
          } catch (e) {
            console.warn('Failed sending event to peer:', peerId, e);
          }
        }
      });
    } else if (this.hostConnection && this.hostConnection.open) {
      try {
        this.hostConnection.send(event);
      } catch (e) {
        console.warn('Failed sending event to host:', e);
      }
    }
  }

  // Call peer with local video/audio stream
  public callPeer(targetPeerId: string, stream: MediaStream) {
    if (this.peer) {
      const call = this.peer.call(targetPeerId, stream);
      this.mediaCalls.set(targetPeerId, call);
    }
  }

  public destroy() {
    this.connections.forEach((conn) => {
      try {
        conn.close();
      } catch (e) {}
    });
    this.mediaCalls.forEach((call) => {
      try {
        call.close();
      } catch (e) {}
    });
    this.cleanupPeer();
    this.connections.clear();
    this.mediaCalls.clear();
    this.listeners.clear();
    this.hostConnection = null;
    this.myPeerId = '';
    this.isHost = false;
    this.roomCode = '';
  }
}

export const peerManager = new PeerManager();
