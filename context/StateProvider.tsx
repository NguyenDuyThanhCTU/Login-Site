'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export type StateContextType = {
  isLoading: number;
  setIsLoading: (loading: any) => void;
  isLanguage: boolean;
  setLanguage: (isLanguage: boolean) => void;
  FormData: any;
  setFormData: (formData: any) => void;
  HandleNavigate: (url: any) => void;
};

export const StateContext = createContext<StateContextType>({
  isLoading: 0,
  setIsLoading: () => {},
  isLanguage: true,
  setLanguage: () => {},
  FormData: {},
  setFormData: () => {},
  HandleNavigate: () => {},
});

export const StateProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(0);
  const [isLanguage, setLanguage] = useState(true);
  const router = useRouter();
  const HandleNavigate = (url: any) => {
    router.push(url);
    setIsLoading(1000);
  };
  //
  const [FormData, setFormData] = useState<any>({});
  return (
    <StateContext.Provider
      value={{
        HandleNavigate,
        FormData,
        setFormData,
        isLanguage,
        setLanguage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
