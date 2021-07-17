import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as AuthSession from 'expo-auth-session';
import AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ReactNode } from 'react';
import { STORAGE_KEYS } from '../utils/types';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const result = await AuthSession.startAsync({ authUrl });

      if (result.type === 'success') {
        const response = await fetch(`https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${result.params.access_token}`);

        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName}?length="1"`,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(STORAGE_KEYS.user);
  }

  useEffect(() => {
    async function loadUserStorageDate(): Promise<void> {
      const userLogged = await AsyncStorage.getItem(STORAGE_KEYS.user);
      if (userLogged) {
        setUser(JSON.parse(userLogged) as User);
      }

      setLoading(false);
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
