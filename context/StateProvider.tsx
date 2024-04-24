"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export type StateContextType = {
  isLoading: number;
  setIsLoading: (loading: any) => void;
  Search: string;
  setSearch: (search: string) => void;
  OpenCart: boolean;
  setOpenCart: (openCart: boolean) => void;

  FormData: any;
  setFormData: (formData: any) => void;
  HandleNavigate: (url: any) => void;
  Signal: any;
  setSignal: (signal: any) => void;
};

export const StateContext = createContext<StateContextType>({
  isLoading: 0,
  setIsLoading: () => {},

  Search: "",
  setSearch: () => {},
  OpenCart: false,
  setOpenCart: () => {},

  FormData: {},
  setFormData: () => {},
  HandleNavigate: () => {},
  Signal: {},
  setSignal: () => {},
});

export const StateProvider = ({ children }: Props) => {
  const [Search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(0);
  const [OpenCart, setOpenCart] = useState(false);
  const [Signal, setSignal] = useState<any>();

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
        Signal,
        setSignal,
        HandleNavigate,
        FormData,
        setFormData,
        OpenCart,
        setOpenCart,
        isLoading,
        setIsLoading,
        Search,
        setSearch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
