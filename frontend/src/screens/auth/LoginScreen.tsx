import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { login } from "../../api/auth.api";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {

  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    try {

      const res = await login({
        email,
        password
      });

      const { token, user } = res.data;
      console.log("token", token);

      if (user.role === "BUYER")  {
        navigation.navigate("Buyer");
      } else {
        navigation.navigate("Seller");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  }
});