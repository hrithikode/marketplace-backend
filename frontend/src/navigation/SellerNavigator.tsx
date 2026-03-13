import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellerDashboard from "../screens/seller/SellerDashboard";
import AddProductScreen from "../screens/seller/AddProductScreen";
import MyProductsScreen from "../screens/seller/MyProductsScreen";

const Stack = createNativeStackNavigator();

export default function SellerNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Dashboard" component={SellerDashboard} />

      <Stack.Screen name="AddProduct" component={AddProductScreen} />

      <Stack.Screen name="MyProducts" component={MyProductsScreen} />

    </Stack.Navigator>
  );
}