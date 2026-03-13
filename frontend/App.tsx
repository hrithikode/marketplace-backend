import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useAuthStore } from "./src/store/auth.store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import BuyerNavigator from "./src/navigation/BuyerNavigator";
import SellerNavigator from "./src/navigation/SellerNavigator";

export default function App() {

  const { token, role, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (

    <NavigationContainer>

      {!token && <AuthNavigator />}

      {token && role === "BUYER" && <BuyerNavigator />}

      {token && role === "SELLER" && <SellerNavigator />}

    </NavigationContainer>

  );

}