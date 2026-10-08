import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/courtroom';
import {
  generateLocalhostJWT,
  decodeJWT,
  storeJWT,
  getStoredJWT,
  clearJWT,
  payloadToUserProfile,
  DecodedJWT,
  DEFAULT_ADVOCATE_PROFILE,
} from '../utils/jwt';

interface UserContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  jwtToken: string | null;
  decodedJWT: DecodedJWT | null;
  userEmail: string;
  updateUser: (fields: Partial<UserProfile>) => void;
  setRole: (role: UserRole) => void;
  resetProfile: () => void;
  loginWithJWT: (email: string, name?: string, role?: UserRole) => boolean;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = DEFAULT_ADVOCATE_PROFILE;

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(() => getStoredJWT());
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(() => {
    const token = getStoredJWT();
    return token ? decodeJWT(token) : null;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const token = getStoredJWT();
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.isValid) {
        return payloadToUserProfile(decoded.payload);
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = getStoredJWT();
    if (!token) return false;
    const decoded = decodeJWT(token);
    return Boolean(decoded && decoded.isValid);
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    const token = getStoredJWT();
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded?.payload?.email) return decoded.payload.email;
    }
    return 'afsa.advocate@courtverse.local';
  });

  // Verify and sync whenever jwtToken changes
  useEffect(() => {
    if (jwtToken) {
      const decoded = decodeJWT(jwtToken);
      if (decoded && decoded.isValid) {
        setDecodedJWT(decoded);
        setUser(payloadToUserProfile(decoded.payload));
        setUserEmail(decoded.payload.email);
        setIsAuthenticated(true);
        storeJWT(jwtToken);
      } else {
        setDecodedJWT(null);
        setIsAuthenticated(false);
        clearJWT();
      }
    } else {
      setDecodedJWT(null);
      setIsAuthenticated(false);
    }
  }, [jwtToken]);

  const loginWithJWT = (email: string, name?: string, role: UserRole = 'Student'): boolean => {
    const userName = name || email.split('@')[0].replace(/\./g, ' ');
    const formattedName = userName.startsWith('Adv.') ? userName : `Adv. ${userName}`;
    const token = generateLocalhostJWT({
      email,
      name: formattedName,
      primaryRole: role,
      college: 'National Law School of India University (NLSIU), Bengaluru',
      barNumber: 'KA/2025/9921',
    });

    setJwtToken(token);
    return true;
  };

  const logout = () => {
    clearJWT();
    setJwtToken(null);
    setDecodedJWT(null);
    setIsAuthenticated(false);
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...fields };
      // Refresh current token with new user profile
      const refreshedToken = generateLocalhostJWT({
        ...updated,
        email: userEmail,
      });
      setJwtToken(refreshedToken);
      return updated;
    });
  };

  const setRole = (role: UserRole) => {
    setUser((prev) => {
      const updated = { ...prev, primaryRole: role };
      const refreshedToken = generateLocalhostJWT({
        ...updated,
        email: userEmail,
      });
      setJwtToken(refreshedToken);
      return updated;
    });
  };

  const resetProfile = () => {
    const token = generateLocalhostJWT({
      ...DEFAULT_ADVOCATE_PROFILE,
      email: 'afsa.advocate@courtverse.local',
    });
    setJwtToken(token);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        jwtToken,
        decodedJWT,
        userEmail,
        updateUser,
        setRole,
        resetProfile,
        loginWithJWT,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

