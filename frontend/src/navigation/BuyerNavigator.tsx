import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/buyer/HomeScreen";
import ShopScreen from "../screens/buyer/ShopScreen";
import ProductScreen from "../screens/buyer/ProductScreen";
import CartScreen from "../screens/buyer/CartScreen";

const Stack = createNativeStackNavigator();

export default function BuyerNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Shop" component={ShopScreen} />

      <Stack.Screen name="Product" component={ProductScreen} />

      <Stack.Screen name="Cart" component={CartScreen} />

    </Stack.Navigator>
  );
}