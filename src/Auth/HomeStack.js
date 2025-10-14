import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home/Home";
import AmberCalculator from "../Screen/Calculator/AmberCalculator";
import FiltCalculator from "../Screen/Calculator/FiltCalculator";
import HexaCalculator from "../Screen/Calculator/HexaCalculator";
import OptiCalculator from "../Screen/Calculator/OptiCalculator";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AmberCalculator" component={AmberCalculator} />
      <Stack.Screen name="FiltCalculator" component={FiltCalculator} />
      <Stack.Screen name="HexaCalculator" component={HexaCalculator} />
      <Stack.Screen name="OptiCalculator" component={OptiCalculator} />
    </Stack.Navigator>
  );
};

export default HomeStack;
