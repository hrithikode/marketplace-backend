import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAuth = useAuthStore((state: any) => state.setAuth);

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });

      console.log("LOGIN RESPONSE:", data);

      setAuth(data.token, data.user.role);
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}