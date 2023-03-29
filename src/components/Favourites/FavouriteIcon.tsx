import React, { useContext } from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FavouritesContext } from "../../services/favourites/FavouritesContext";

import { RestaurantType } from "../../utils/types";

type RestaurantPropType = {
  restaurant: RestaurantType;
};

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

const Favourite = ({ restaurant }: RestaurantPropType) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (fav) => fav.placeId === restaurant.placeId
  );

  return (
    <FavouriteButton
      onPress={() =>
        isFavourite
          ? removeFromFavourites(restaurant)
          : addToFavourites(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};

export default Favourite;
