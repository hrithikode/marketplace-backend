import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { api } from "../../api/axios";

export default function MapScreen() {

  const [location, setLocation] = useState<any>(null);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);

    const res = await api.get(
      `/shops/nearby?lat=${loc.coords.latitude}&lng=${loc.coords.longitude}`
    );

    setShops(res.data);

  };

  if (!location) return null;

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >

        {/* User location */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title="You"
        />

        {/* Shops */}
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude
            }}
            title={shop.name}
            description={`${shop.distance.toFixed(2)} km`}
          />
        ))}

      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});