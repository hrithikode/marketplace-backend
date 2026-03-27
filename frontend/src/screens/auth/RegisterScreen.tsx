import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { register } from "../../api/auth.api";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUYER"); // default

  const handleRegister = async () => {
    try {
      const data = await register({
        name,
        email,
        password,
        role,
      });

      console.log(data);

      navigation.navigate("Otp", { email });
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      
      {/* For now role is fixed (we’ll improve later) */}
      
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}