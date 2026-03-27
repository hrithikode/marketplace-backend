import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import axios from "axios";
import { verifyOtp } from "../../api/auth.api";

export default function VerifyOtpScreen({ route, navigation }: any) {
  const [otp, setOtp] = useState("");

  const email = route.params?.email || "";

  const handleVerify = async () => {
    try {
      const res = await verifyOtp( { email, otp })

      console.log(res.data);

      navigation.navigate("Login");
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter OTP"
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}