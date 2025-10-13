import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home/Home";
import AmberCalculator from "../Screen/Calculator/AmberCalculator";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AmberCalculator" component={AmberCalculator} />
    </Stack.Navigator>
  );
};

export default HomeStack;
