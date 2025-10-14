import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/Hydropod_Logo.png";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handlePress = (podName) => {
    switch (podName) {
      case "Amber & Purple Pod":
        navigation.navigate("AmberCalculator");
        break;
      case "Filt Pod":
        navigation.navigate("FiltCalculator");
        break;
      case "Hexa Pod":
        navigation.navigate("HexaCalculator");
        break;
      case "Opti Pod":
        navigation.navigate("OptiCalculator");
        break;
      default:
        console.log(`${podName} pressed`);
        break;
    }
  };

  const pods = ["Amber & Purple Pod", "Filt Pod", "Hexa Pod", "Opti Pod"];

  const buttons = [
    {
      name: "Amber & Purple Pod",
      color: ["#FFBF00", "#FFA500"],
      icon: "water",
    },
    { name: "Hexa Pod", color: ["#8E44AD", "#9B59B6"], icon: "cube" },
    { name: "Opti Pod", color: ["#3498DB", "#2980B9"], icon: "speedometer" },
    { name: "Filt Pod", color: ["#2ECC71", "#27AE60"], icon: "leaf" },
  ];

  return (
    <View style={styles.container}>
      {/* ====== Header ====== */}
      <View style={styles.header}>
        <Image source={logo} style={styles.headerLogo} resizeMode="contain" />
        <Ionicons
          name="person-circle-outline"
          style={styles.headerIcon}
          size={40}
          color="#34495E"
        />
      </View>

      {/* ====== Main Content ====== */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>💧Welcome to HydroWater Pods</Text>
        <Text style={styles.subtitle}>Choose your Pod to get started</Text>

        <View style={styles.buttonGrid}>
          {buttons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handlePress(btn.name)}
            >
              <LinearGradient colors={btn.color} style={styles.gradient}>
                <Ionicons
                  name={btn.icon}
                  size={32}
                  color="#fff"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.buttonText}>{btn.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEDED",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerLogo: {
    width: 120,
    height: 40,
    marginTop: 30,
  },
  headerIcon: {
    marginTop: 30,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#7F8C8D",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  gradient: {
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Home;
