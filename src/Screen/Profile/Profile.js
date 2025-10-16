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

const Profile = ({ setUserToken, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        console.log("Loaded from AsyncStorage:", storedUser);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Ionicons
            name="person-circle-outline"
            style={styles.headerIcon}
            size={40}
            color="#34495E"
          />
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* User Info */}
      <View style={styles.userCard}>
        {/* Avatar with first letter */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={styles.userName}>{user?.name || "N/A"}</Text>
        <Text style={styles.userPhone}>{user?.mobile_number || "N/A"}</Text>
        <Text style={styles.userRole}>Role: {user?.userRole || "N/A"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F7" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  headerIcon: { marginTop: 30 },
  userCard: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 90,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  avatarText: {
    color: "#2C3E50",
    fontSize: 38,
    fontWeight: "700",
  },
  avatarText: { fontSize: 38, fontWeight: "700", color: "#2C3E50" },
  userName: { fontSize: 28, fontWeight: "700", color: "#2C3E50", marginTop: 5 },
  userPhone: { fontSize: 16, color: "#7F8C8D", marginTop: 5 },
  userRole: { fontSize: 16, color: "#555", marginTop: 3 },

  logoutButton: {
    marginTop: 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "600",
  },
});

export default Profile;
