import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Img1 from "../../assets/Hydropod_Logo.png";
import Img2 from "../../assets/Otp.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Otp = ({ route, navigation }) => {
  const { phone, setUserToken } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      Alert.alert("Error", "Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://hydrowater-backend.vercel.app/auth/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: phone,
            otp: otpValue,
          }),
        }
      );

      const data = await response.json();
      console.log("data", data);

      setLoading(false);

      if (response.ok && data.success) {
        const user = data?.data?.user || {};
        console.log("✅ User to store:", user);
        await AsyncStorage.setItem("userToken", data.data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(user));

        const checkUser = await AsyncStorage.getItem("userData");
        console.log("🔍 Check stored userData:", checkUser);
        setUserToken(data.data.token);
        console.log("setUserToken", setUserToken);
        Alert.alert("Success", data.message, [
          {
            text: "OK",
            onPress: () => navigation.replace("Home"),
          },
        ]);
      } else {
        Alert.alert(
          "Error",
          data.error?.message || data.message || "Invalid OTP"
        );
      }
    } catch (error) {
      setLoading(false);
      console.log("Verify OTP Error:", error);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image source={Img1} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.otpSide}>
          <View style={styles.otpImageContainer}>
            <Image source={Img2} style={styles.otpImage} resizeMode="contain" />
          </View>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
          <Text style={styles.phone}>{phone}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.inputBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleBackspace(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn’t receive the code?{" "}
              <Text style={styles.resendLink}>Resend OTP</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  otpSide: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageContainer: { width: "100%", marginTop: 10, marginBottom: 2 },
  image: { width: width * 0.3, height: width * 0.3 },
  otpImageContainer: { width: "100%", marginBottom: 20 },
  otpImage: { width: width * 0.9, height: width * 0.6 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#32516e",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#6b7280", textAlign: "center" },
  phone: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 30,
    gap: 8,
  },
  inputBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  button: {
    backgroundColor: "#32516e",
    paddingVertical: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  resendContainer: { marginTop: 25 },
  resendText: { fontSize: 15, color: "#4b5563" },
  resendLink: { color: "#31506d", fontWeight: "bold" },
});

export default Otp;
