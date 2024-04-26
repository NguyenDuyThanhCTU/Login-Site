'use client';
import { AccountProps } from '@assets/props';
import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
  verify: boolean;
  setVerify: (state: boolean) => void;
  currentUser: AccountProps;
  setCurrentUser: (currentUser: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  verify: false,
  setVerify: () => {},
  currentUser: {
    date: '',
    id: '',
    image: '',
    name: '',
    password: '',
    role: 'editor',
    apiKey: '',
    appId: '',
    firebaseConfig: {
      apiKey: '',
      appId: '',
      authDomain: '',
      storageBucket: '',
      measurementId: '',
      messagingSenderId: '',
      projectId: '',
    },
    measurementId: '',
    messagingSenderId: '',
    projectId: '',
    stt: 0,
    username: '',
    email: '',
    phone: '',
  },
  setCurrentUser: () => {},
});

export const AuthProviders = ({ children }: Props) => {
  const [verify, setVerify] = useState(false);
  const [currentUser, setCurrentUser] = useState<AccountProps>({
    date: '',
    id: '',
    image: '',
    name: '',
    password: '',
    role: 'editor',
    apiKey: '',
    appId: '',
    firebaseConfig: {
      apiKey: '',
      appId: '',
      authDomain: '',
      storageBucket: '',
      measurementId: '',
      messagingSenderId: '',
      projectId: '',
    },
    measurementId: '',
    messagingSenderId: '',
    projectId: '',
    stt: 0,
    username: '',
    email: '',
    phone: '',
  });

  return (
    <AuthContext.Provider
      value={{ verify, setVerify, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
