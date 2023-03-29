import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/LocationContext";

import styled from "styled-components/native";
import { SearchProps } from "../../../utils/types";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  width: 100%;
`;

const SearchMap = ({ isFavouritesToggle, onFavouritesToggle }: SearchProps) => {
  const { searchTerm, search } = useContext(LocationContext);
  const [searchQuery, setSearchQuery] = useState<string>(searchTerm);

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggle ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchQuery}
        onChangeText={(text: string) => {
          setSearchQuery(text);
        }}
        onSubmitEditing={() => {
          if (!searchQuery.length) return;
          search(searchQuery);
        }}
      />
    </SearchContainer>
  );
};

export default SearchMap;
