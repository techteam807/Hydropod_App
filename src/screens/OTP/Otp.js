import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import Img1 from "../../../assets/Hydropod_Logo.png";
import Img2 from "../../../assets/OTP01.jpg";

const { width } = Dimensions.get("window");

const Otp = ({ route, navigation }) => {
  const { phone, setUserToken } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if number entered
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

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // alert("OTP Verified Successfully ✅");
      setUserToken("verified");
    } else {
      alert("Please enter all 6 digits");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn’t receive the code?{" "}
            <Text style={styles.resendLink}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 2,
  },
  otpSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 2,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
  },
  otpImageContainer: {
    width: "100%",
    marginBottom: 20,
  },
  otpImage: {
    width: width * 0.9,
    height: width * 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#31506d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
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
    backgroundColor: "#31506d",
    paddingVertical: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendContainer: {
    marginTop: 25,
  },
  resendText: {
    fontSize: 15,
    color: "#4b5563",
  },
  resendLink: {
    color: "#31506d",
    fontWeight: "bold",
  },
});

export default Otp;
