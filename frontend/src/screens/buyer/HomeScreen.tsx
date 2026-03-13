import { View, Text, Button } from "react-native";
import { useAuthStore } from "../../store/auth.store";

export default function HomeScreen() {

  const logout = useAuthStore((state) => state.logout);

  return (
    <View>
      <Text>Buyer Home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}