import React, { FC, useState, createContext, useEffect, Children } from "react";
import { locationRequest, locationTransform } from "./LocationService";

import { ChildrenType, cityLocationType } from "../../utils/types";

type contextValueType = {
  location: cityLocationType[];
  isLoading: boolean;
  error: string | unknown;
  search: (arg0: string) => void;
  searchTerm: string;
};

const initContextValue = {
  location: [],
  isLoading: false,
  error: null,
  search: () => null,
  searchTerm: "",
};

export const LocationContext =
  createContext<contextValueType>(initContextValue);

export const LocationContextProvider: FC<ChildrenType> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<cityLocationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  const onSearch = (searchKeyword: string = "Antwerp") => {
    setIsLoading(true);
    setSearchTerm(searchKeyword);

    setTimeout(async () => {
      try {
        const res = await locationRequest(searchKeyword.toLowerCase());
        if (res) {
          // @ts-ignore
          setLocation(locationTransform(res));
          setIsLoading(false);
        }
      } catch (err) {
        console.error("fetch mocks err", err);
        setError(err);
      }
    }, 2000);
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        search: onSearch,
        searchTerm,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
