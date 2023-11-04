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
    lat: 37.7749295,
    lng: -122.4194155,
    viewport: {
      northeast: { lat: 37.812, lng: -122.3482 },
      southwest: { lat: 37.70339999999999, lng: -122.527 },
    },
  },
  isLoadingLocation: false,
  errorLocation: false,
  search: () => null,
  searchTerm: "san francisco",
};

export const LocationContext =
  createContext<contextValueType>(initContextValue);

export const LocationContextProvider: FC<ChildrenType> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("san francisco");
  const [location, setLocation] = useState<LocationType>({
    lat: 37.7749295,
    lng: -122.4194155,
    viewport: {
      northeast: { lat: 37.812, lng: -122.3482 },
      southwest: { lat: 37.70339999999999, lng: -122.527 },
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setSearchTerm(searchKeyword);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (!searchTerm.length) {
        return;
      }

      try {
        const res = await locationRequest(searchTerm.toLowerCase());
        if (res) {
          // @ts-ignore
          setLocation(locationTransform(res));
          setError(false);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("fetch location err", err);
        setError(err);
        setIsLoading(false);
        return;
      }
    };

    fetchLocation();
  }, [searchTerm]);

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
