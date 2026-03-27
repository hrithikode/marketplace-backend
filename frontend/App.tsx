import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "./src/store/auth.store";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./src/screens/auth/LandingScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import VerifyOtpScreen from "./src/screens/auth/VerifyOtpScreen";
import BuyerHome from "./src/screens/buyer/HomeScreen";
import ShopScreen from "./src/screens/buyer/ShopScreen";


const Stack = createNativeStackNavigator();



function SellerDashboard() {
  return <Text>Seller Dashboard</Text>;
}

export default function App() {
  const token = useAuthStore((state: any) => state.token);
  const role = useAuthStore((state: any) => state.role);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {!token && (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Otp" component={VerifyOtpScreen} />
          </>
        )}
        
        {token && role === "BUYER" && (
          <>
          <Stack.Screen name="BuyerHome" component={BuyerHome} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          </>
        )}
        
        {token && role === "SELLER" && (
          <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}