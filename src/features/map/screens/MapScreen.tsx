import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import { Spacer } from "../../../components/Spacer";
import { TextComp } from "../../../components/Typography/Text";
import SearchMap from "../components/SearchMap";
import MarkerCustomCallout from "../components/MarkerCustomCallout";
import { LocationContext } from "../../../services/location/LocationContext";
import { RestaurantsContext } from "../../../services/restaurants/RestaurantsContext";

import { AppNavigationProp } from "../../../utils/types";

import { ErrorContainer } from "./MapScreen.style";

type MapScreenProps = StackScreenProps<AppNavigationProp, "Map">;

const MapScreen = ({ navigation }: MapScreenProps) => {
  const { location, errorLocation } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  const [isToggle, setIsToggle] = useState(false);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <View style={styles.container}>
      <SearchMap
        isFavouritesToggle={isToggle}
        onFavouritesToggle={() => setIsToggle(!isToggle)}
      />

      {errorLocation ? (
        <ErrorContainer>
          <Spacer size="large">
            <TextComp variant="error">
              {`An error occurred: ${errorLocation}`}
            </TextComp>
          </Spacer>
        </ErrorContainer>
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: latDelta,
            longitudeDelta: 0.02,
          }}
        >
          {restaurants.map((restaurant) => {
            return (
              <Marker
                key={restaurant.name}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
                title={restaurant.name}
              >
                <Callout
                  onPress={() =>
                    navigation.navigate("RestaurantDetailScreen", {
                      restaurant,
                    })
                  }
                >
                  <MarkerCustomCallout restaurant={restaurant} />
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
