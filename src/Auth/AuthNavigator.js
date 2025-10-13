import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../Screen/Login";
import Otp from "../Screen/Otp";

const Stack = createStackNavigator();

const AuthNavigator = ({ setUserToken }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} setUserToken={setUserToken} />}
      </Stack.Screen>
      <Stack.Screen name="Otp">
        {(props) => <Otp {...props} setUserToken={setUserToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;

