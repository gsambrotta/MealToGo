import React, { FC, useState, createContext, useEffect, Children } from "react";
import { locationRequest, locationTransform } from "./LocationService";

import { ChildrenType, LocationType } from "../../utils/types";

type contextValueType = {
  location: LocationType;
  isLoadingLocation: boolean;
  errorLocation: string | boolean | unknown;
  search: (arg0: string) => void;
  searchTerm: string;
};

const initContextValue = {
  location: {
    lng: 0,
    lat: 0,
  },
  isLoadingLocation: false,
  errorLocation: false,
  search: () => null,
  searchTerm: "toronto",
};

export const LocationContext =
  createContext<contextValueType>(initContextValue);

export const LocationContextProvider: FC<ChildrenType> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("san francisco");
  const [location, setLocation] = useState<LocationType>({ lng: 0, lat: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setSearchTerm(searchKeyword);

    setTimeout(async () => {
      try {
        const res = await locationRequest(searchKeyword.toLowerCase());
        if (res) {
          // @ts-ignore
          setLocation(locationTransform(res));
          setIsLoading(false);
          setError(false);
        }
      } catch (err) {
        console.error("fetch mocks err", err);
        setError(err);
        setIsLoading(false);
        return;
      }
    }, 2000);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoadingLocation: isLoading,
        errorLocation: error,
        search: onSearch,
        searchTerm,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
