import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ setUserToken }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["userToken", "userData"]);
    setUserToken(null);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader} />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name || "User"}</Text>
      </View>

      <Text style={styles.sectionTitle}>Account Information</Text>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="call-outline" size={20} color="#1D2939" />
          </View>
          <View>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user?.mobile_number || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={20} color="#1D2939" />
          </View>
          <View>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user?.userRole || "N/A"}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  topHeader: {
    height: 160,
    backgroundColor: "#32506e",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: -60,
    marginHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 14,
    elevation: 5,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#E8ECF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 36, fontWeight: "700", color: "#1D2939" },
  name: { fontSize: 22, fontWeight: "700", color: "#1D2939" },
  role: { fontSize: 14, marginTop: 4, color: "#6C727F" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 22,
    marginTop: 30,
    marginBottom: 10,
    color: "#1D2939",
  },
  infoBox: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF1F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: { fontSize: 13, color: "#6C727F" },
  value: { fontSize: 16, fontWeight: "600", color: "#1D2939", marginTop: 2 },
  line: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 5 },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32506e",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 35,
  },
  logoutText: { marginLeft: 8, fontSize: 17, fontWeight: "600", color: "#fff" },
});

export default Profile;
