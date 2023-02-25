import * as React from "react";
import { Searchbar } from "react-native-paper";

const Searchbox = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search a restaurant"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default Searchbox;
