import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCartStore } from "../../store/cart.store";

const products = [
  { id: "1", name: "Milk", price: 50 },
  { id: "2", name: "Bread", price: 30 },
  { id: "3", name: "Eggs", price: 80 },
];

export default function ShopScreen({ route }: any) {
  const shop = route.params?.shop;

  const addToCart = useCartStore((state: any) => state.addToCart);
    const cart = useCartStore((state: any) => state.cart);
console.log("CART:", cart);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 22 }}>{shop?.name}</Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>
        {shop?.address}
      </Text>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Cart Items: {cart.length}
      </Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
              <Text style={{ color: "gray" }}>₹{item.price}</Text>
            </View>

            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                backgroundColor: "black",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}