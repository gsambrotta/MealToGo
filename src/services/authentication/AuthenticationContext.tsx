import React, { FC, useState, createContext, useRef, useEffect } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  UserCredential,
  Auth,
} from "firebase/auth";
import { loginRequest } from "./AuthenicationService";

import { ChildrenType } from "../../utils/types";

type contextValueType = {
  isAutheticated: boolean;
  isLoading: boolean;
  error: null | string;
  user: UserCredential | null;
  onLogin: (arg1: Auth, arg2: string, arg3: string) => void;
};

const initContextValue = {
  isAutheticated: false,
  isLoading: false,
  error: null,
  user: null,
  onLogin: (arg1: Auth, arg2: string, arg3: string) => null,
};

export const AuthenticationContext =
  createContext<contextValueType>(initContextValue);

export const AuthenticationContextProvider: FC<ChildrenType> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | "">(null);
  const [user, setUser] = useState<UserCredential | null>(null);

  const auth = useRef(getAuth()).current;

  const onLogin = (auth: Auth, email: string, password: string) => {
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

  return (
    <AuthenticationContext.Provider
      value={{
        isAutheticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
