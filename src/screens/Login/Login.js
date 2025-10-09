// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Pressable,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import Img1 from "../../../assets/Hydropod_Logo.png";
// import Img2 from "../../../assets/Login001.jpg";
// import Icon from "react-native-vector-icons/Feather";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// const Login = ({ setUserToken }) => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [country, setCountry] = useState("+91");

//   const validate = () => {
//     let valid = true;
//     let newErrors = {};

//     if (!mobileNumber.trim()) {
//       newErrors.mobileNumber = "Mobile number is required";
//       valid = false;
//     } else if (!/^\d{10}$/.test(mobileNumber)) {
//       newErrors.mobileNumber = "Enter a valid 10-digit number";
//       valid = false;
//     }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleLogin = async () => {
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://hydrowater-backend.vercel.app/auth/loginTechnician",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ mobile_number: `${country}${mobileNumber}` }),
//         }
//       );

//       const data = await response.json();
//       setLoading(false);

//       if (data.success) {
//         Alert.alert("Success", data.message, [
//           {
//             text: "OK",
//             onPress: () =>
//               navigation.navigate("Otp", {
//                 phone: `${country}${mobileNumber}`,
//                 setUserToken, // pass function to OTP page
//               }),
//           },
//         ]);
//       } else {
//         Alert.alert("Error", data.message || "Something went wrong");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log("Login API Error:", error);
//       Alert.alert("Error", "Unable to connect to server");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.imageContainer}>
//         <Image source={Img1} style={styles.image} resizeMode="contain" />
//       </View>
//       <View style={styles.loginSide}>
//         <View style={styles.loginImageContainer}>
//           <Image source={Img2} style={styles.loginImage} resizeMode="contain" />
//         </View>
//         <Text style={styles.heading}>Let's Sign In</Text>

//         <View style={styles.formContainer}>
//           <View style={styles.fieldset}>
//             <Text style={styles.legend}>Mobile Number</Text>
//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="call-outline"
//                 size={20}
//                 color="#4B5563"
//                 style={styles.icon}
//               />
//               <Text style={styles.prefix}>{country}</Text>
//               <TextInput
//                 placeholder="Enter Your Phone"
//                 style={styles.textInput}
//                 keyboardType="phone-pad"
//                 value={mobileNumber}
//                 onChangeText={setMobileNumber}
//               />
//             </View>
//             {errors.mobileNumber && (
//               <Text style={styles.errorText}>{errors.mobileNumber}</Text>
//             )}
//           </View>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, loading && styles.disabledButton]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Sign In</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* <Pressable style={styles.signUpContainer}>
//         <Text style={styles.signUpText}>Don't have an account?</Text>
//         <Text style={styles.signUpLink}> Sign Up</Text>
//       </Pressable> */}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 20,
//     paddingTop: 2,
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   loginSide: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageContainer: {
//     width: "100%",
//     marginTop: 10,
//     marginBottom: 2,
//   },
//   image: {
//     width: width * 0.3,
//     height: width * 0.3,
//   },
//   loginImageContainer: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   loginImage: {
//     width: width * 0.9,
//     height: width * 0.6,
//   },
//   heading: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#31506d",
//     marginBottom: 30,
//   },
//   formContainer: {
//     width: "100%",
//     paddingHorizontal: 20,
//   },
//   fieldset: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 5,
//     padding: 8,
//     position: "relative",
//   },
//   legend: {
//     position: "absolute",
//     top: -10,
//     left: 10,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 5,
//     fontSize: 12,
//     color: "#4B5563",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginLeft: 5,
//     marginRight: 8,
//   },
//   prefix: {
//     fontSize: 16,
//     color: "#4B5563",
//     marginRight: 8,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 8,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 4,
//   },
//   buttonContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: 25,
//     paddingHorizontal: 20,
//   },
//   button: {
//     backgroundColor: "#31506d",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   disabledButton: {
//     backgroundColor: "#6787a5ff",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   signUpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   signUpText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   signUpLink: {
//     fontSize: 16,
//     color: "#10B981",
//     fontWeight: "bold",
//   },
// });

// export default Login;


import { View, Text } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login