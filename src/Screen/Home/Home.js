import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/Hydropod_Logo.png";
import filtImg from "../../../assets/FILT_Pod.png";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

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

  const pods = [
    { name: "Amber & Purple Pod", color: "#FFD966", image: filtImg },
    { name: "Hexa Pod", color: "#B39CD0", image: filtImg },
    { name: "Opti Pod", color: "#93CFF0", image: filtImg },
    { name: "Filt Pod", color: "#82E0AA", image: filtImg },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.headerLogo} resizeMode="contain" />
        <Ionicons
          name="person-circle-outline"
          style={styles.headerIcon}
          size={40}
          color="#34495E"
        />
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>💧 Welcome to HydroPods</Text>
        <Text style={styles.subtitle}>Choose your Pod to get started</Text>

        {pods.map((pod, index) => {
          const scaleAnim = useRef(new Animated.Value(1)).current;

          const onPressIn = () => {
            Animated.spring(scaleAnim, {
              toValue: 0.97,
              useNativeDriver: true,
            }).start();
          };

          const onPressOut = () => {
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          };

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handlePress(pod.name)}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    backgroundColor: pod.color,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <Image source={pod.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{pod.name}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEDED" },
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
  headerLogo: { width: 120, height: 40, marginTop: 30 },
  headerIcon: { marginTop: 30 },
  scrollArea: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: "center", paddingVertical: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#7F8C8D",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: width * 0.9,
    height: 100,
    borderRadius: 60, // rounded oval shape
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 20,
    marginLeft: -20, // pop-out effect
  },
  cardText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
  },
});

export default Home;
