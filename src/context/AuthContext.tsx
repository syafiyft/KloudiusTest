import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidEmail, isValidPassword, isRequired } from '../utils/validation';
import type { User, AuthContextValue } from '../types';

const REGISTERED_USERS_KEY = 'registered_users';
const CURRENT_SESSION_KEY = 'current_session';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function initializeAuth(): Promise<void> {
    try {
      const session = await AsyncStorage.getItem(CURRENT_SESSION_KEY);
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string): Promise<string | null> {
    if (!isValidEmail(email)) {
      return 'Please enter a valid email address.';
    }
    if (!isRequired(password)) {
      return 'Password is required.';
    }

    try {
      const stored = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      const users: (User & { password: string })[] = stored ? JSON.parse(stored) : [];
      const match = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!match) {
        return 'Incorrect email or password.';
      }
      const session: User = { name: match.name, email: match.email };
      await AsyncStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return null;
    } catch {
      return 'Something went wrong. Please try again.';
    }
  }

  async function signup(name: string, email: string, password: string): Promise<string | null> {
    if (!isRequired(name)) return 'Name is required.';
    if (!isRequired(email)) return 'Email is required.';
    if (!isValidEmail(email)) return 'Please enter a valid email address.';
    if (!isValidPassword(password)) return 'Password must be at least 6 characters.';

    try {
      const stored = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      const users: (User & { password: string })[] = stored ? JSON.parse(stored) : [];
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return 'An account with this email already exists.';
      }
      const newUser = { name: name.trim(), email: email.toLowerCase(), password };
      users.push(newUser);
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
      const session: User = { name: newUser.name, email: newUser.email };
      await AsyncStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return null;
    } catch {
      return 'Something went wrong. Please try again.';
    }
  }

  async function logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_SESSION_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, initializeAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
