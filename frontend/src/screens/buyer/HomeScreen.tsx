import { View, Text, FlatList, TouchableOpacity } from "react-native";

const shops = [
  { id: "1", name: "Ritik Grocery Store", address: "Near LNCT" },
  { id: "2", name: "Fresh Fruits Shop", address: "Kolar Road" },
  { id: "3", name: "Daily Needs Mart", address: "Bhopal" },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Nearby Shops
      </Text>

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Shop", { shop: item })}
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: "gray" }}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}