import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import ShopCard from "../../components/ShopCard";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

  const navigation = useNavigation<any>();

  const [shops] = useState([
    {
      id: "1",
      name: "Cement Store",
      distance: "1.2 km",
      rating: 4.5
    },
    {
      id: "2",
      name: "Building Materials Shop",
      distance: "2 km",
      rating: 4.2
    }
  ]);

  return (
    <View style={styles.container}>

      {/* 🔥 Header */}
      <Text style={styles.header}>Nearby Shops</Text>

      {/* 🔥 Search Bar */}
      <TextInput
        placeholder="Search shops..."
        style={styles.search}
      />

      {/* 🔥 Shop List */}
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShopCard
            name={item.name}
            distance={item.distance}
            rating={item.rating}
            onPress={() =>
              navigation.navigate("Shop", { shopId: item.id })
            }
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5"
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12
  },

  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16
  }

});