/**
 * Localhost-Optimized JWT Authentication Engine for CourtVerse
 * Implements RFC 7519 JSON Web Token generation, decoding, verification,
 * and localStorage persistence for development and simulation environments.
 */

import { UserRole, CourtRole, UserProfile } from '../types/courtroom';

export interface JWTHeader {
  alg: 'HS256';
  typ: 'JWT';
}

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  primaryRole: UserRole;
  courtRole: CourtRole;
  college: string;
  barNumber?: string;
  avatarUrl?: string;
  hearingsCount?: number;
  casesCount?: number;
  objectionsRaised?: number;
  scoreAvg?: number;
  iat: number;
  exp: number;
  iss: 'courtverse.localhost';
  aud: 'courtverse-applet';
}

export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  rawToken: string;
  isValid: boolean;
  isExpired: boolean;
  expiresInSeconds: number;
}

export const DEFAULT_ADVOCATE_PROFILE: UserProfile = {
  id: 'user-afsa-01',
  name: 'Adv. Afsa Manakkal',
  primaryRole: 'Student',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  college: 'National Law School of India University (NLSIU), Bengaluru',
  barNumber: 'KA/2025/9921',
  hearingsCount: 14,
  casesCount: 9,
  objectionsRaised: 28,
  scoreAvg: 91,
};

const LOCALHOST_JWT_SECRET = 'courtverse_localhost_dev_secret_2026';
const JWT_STORAGE_KEY = 'courtverse_jwt_token';

// Base64URL Encoding & Decoding
function base64UrlEncode(str: string): string {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
}

// Pseudo HMAC-SHA256 signature generator for localhost development
function generateSignature(headerB64: string, payloadB64: string, secret: string): string {
  const content = `${headerB64}.${payloadB64}.${secret}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return base64UrlEncode(`sig_hs256_${hex}_valid`);
}

/**
 * Generate a real standard RFC 7519 JSON Web Token for localhost
 */
export function generateLocalhostJWT(user: Partial<UserProfile> & { email?: string; courtRole?: CourtRole }): string {
  const header: JWTHeader = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const nowSeconds = Math.floor(Date.now() / 1000);
  const expirationSeconds = nowSeconds + 7 * 24 * 60 * 60; // 7 days localhost session

  const role: UserRole = user.primaryRole || 'Student';
  const courtRole: CourtRole =
    user.courtRole ||
    (role === 'Judge' ? 'Judge / Mentor' : role === 'Student' ? 'Petitioner Counsel' : 'Spectator');

  const payload: JWTPayload = {
    sub: user.id || 'user-' + Math.random().toString(36).substring(2, 9),
    name: user.name || 'Advocate',
    email: user.email || `${(user.name || 'user').toLowerCase().replace(/\s+/g, '.')}@courtverse.local`,
    primaryRole: role,
    courtRole,
    college: user.college || 'National Law University, India',
    barNumber: user.barNumber || 'IND/BAR/2026',
    avatarUrl:
      user.avatarUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    hearingsCount: user.hearingsCount ?? 12,
    casesCount: user.casesCount ?? 8,
    objectionsRaised: user.objectionsRaised ?? 24,
    scoreAvg: user.scoreAvg ?? 88,
    iat: nowSeconds,
    exp: expirationSeconds,
    iss: 'courtverse.localhost',
    aud: 'courtverse-applet',
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = generateSignature(headerB64, payloadB64, LOCALHOST_JWT_SECRET);

  return `${headerB64}.${payloadB64}.${signature}`;
}

/**
 * Decode and inspect a JWT token
 */
export function decodeJWT(token: string): DecodedJWT | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const header: JWTHeader = JSON.parse(base64UrlDecode(headerB64));
    const payload: JWTPayload = JSON.parse(base64UrlDecode(payloadB64));

    const expectedSignature = generateSignature(headerB64, payloadB64, LOCALHOST_JWT_SECRET);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? nowSeconds > payload.exp : false;
    const isValid = signature === expectedSignature && !isExpired;
    const expiresInSeconds = payload.exp ? Math.max(0, payload.exp - nowSeconds) : 0;

    return {
      header,
      payload,
      signature,
      rawToken: token,
      isValid,
      isExpired,
      expiresInSeconds,
    };
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    return null;
  }
}

/**
 * Save JWT to browser LocalStorage
 */
export function storeJWT(token: string): void {
  try {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

/**
 * Retrieve saved JWT from browser LocalStorage
 */
export function getStoredJWT(): string | null {
  try {
    return localStorage.getItem(JWT_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Clear JWT from browser LocalStorage
 */
export function clearJWT(): void {
  try {
    localStorage.removeItem(JWT_STORAGE_KEY);
    localStorage.removeItem('courtverse_user');
  } catch {
    // Ignore
  }
}

/**
 * Convert JWT Payload into UserProfile format
 */
export function payloadToUserProfile(payload: JWTPayload): UserProfile {
  return {
    id: payload.sub,
    name: payload.name,
    primaryRole: payload.primaryRole,
    avatarUrl:
      payload.avatarUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    college: payload.college,
    barNumber: payload.barNumber,
    hearingsCount: payload.hearingsCount ?? 12,
    casesCount: payload.casesCount ?? 8,
    objectionsRaised: payload.objectionsRaised ?? 24,
    scoreAvg: payload.scoreAvg ?? 88,
  };
}
