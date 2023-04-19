import React, { FC, useState, createContext, useRef } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  UserCredential,
  Auth,
} from "firebase/auth";
import { loginRequest, registerRequest } from "./AuthenicationService";

import { ChildrenType } from "../../utils/types";

type contextValueType = {
  isAutheticated: boolean;
  isLoading: boolean;
  error: string;
  user: UserCredential | null;
  onLogin: (arg1: string, arg2: string) => void;
  onRegister: (arg1: string, arg2: string, arg3: string) => void;
};

const initContextValue = {
  isAutheticated: false,
  isLoading: false,
  error: "",
  user: null,
  onLogin: () => null,
  onRegister: () => null,
};

export const AuthenticationContext =
  createContext<contextValueType>(initContextValue);

export const AuthenticationContextProvider: FC<ChildrenType> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<UserCredential | null>(null);

  // Check if user exist on loading, so authetication is persisten
  onAuthStateChanged((usr) => {
    if(usr) {
      setUser(usr)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }) 

  const auth = useRef(getAuth()).current;

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);

    loginRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        return;
      })
      .catch((error: any) => {
        setIsLoading(false);
        setError(error.toString());
        return;
      });
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);

    if (password !== repeatedPassword) {
      return setError("Error: Passwords do not match");
    }
    registerRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        return;
      })
      .catch((error: any) => {
        setIsLoading(false);
        setError(error.toString());
        return;
      });
  };

  const onLogout =() => {
    setUser(null)
    signOut()
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAutheticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout  
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
