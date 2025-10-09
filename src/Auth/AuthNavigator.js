import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login/Login";
import Otp from "../screens/OTP/Otp";

const Stack = createStackNavigator();

const AuthNavigator = ({ setUserToken }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} setUserToken={setUserToken} />}
      </Stack.Screen>
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
