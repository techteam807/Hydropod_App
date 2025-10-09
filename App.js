import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Auth/AppNavigator";
import AuthNavigator from "./src/Auth/AuthNavigator";

export default function App() {
  const [userToken, setUserToken] = useState(null);

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
