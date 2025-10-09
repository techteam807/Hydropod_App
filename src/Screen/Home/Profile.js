import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Profile = ({ setUserToken }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile Screen</Text>
      <Button title="Logout" color="red" onPress={() => setUserToken(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, marginBottom: 20 },
});

export default Profile;
