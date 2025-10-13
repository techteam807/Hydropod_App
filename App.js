import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./src/Auth/AppNavigator";
import AuthNavigator from "./src/Auth/AuthNavigator";
import jwtDecode from "jwt-decode";

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
              await AsyncStorage.removeItem("userToken");
              setUserToken(null);
            } else {
              setUserToken(token);
            }
          } catch {
            setUserToken(token);
          }
        }
      } catch (error) {
        console.log("Error checking token:", error);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {userToken ? (
        <AppNavigator setUserToken={setUserToken} />
      ) : (
        <AuthNavigator setUserToken={setUserToken} />
      )}
    </NavigationContainer>
  );
}
