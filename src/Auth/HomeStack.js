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
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AmberCalculator"
        component={AmberCalculator}
        options={{
          headerShown: true,
          title: "Amber & Purple Pod Calculator", // <-- set your desired header title here
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTintColor: "#2C3E50",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen
        name="FiltCalculator"
        component={FiltCalculator}
        options={{
          headerShown: true,
          title: "Filt Pod",
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTintColor: "#2C3E50",
          headerTitleStyle: { fontWeight: "700", fontSize: 20 },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="HexaCalculator"
        component={HexaCalculator}
        options={{
          headerShown: true,
          title: "Hexa Pod",
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTintColor: "#2C3E50",
          headerTitleStyle: { fontWeight: "700", fontSize: 20 },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="OptiCalculator"
        component={OptiCalculator}
        options={{
          headerShown: true,
          title: "Opti Pod",
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTintColor: "#2C3E50",
          headerTitleStyle: { fontWeight: "700", fontSize: 20 },
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
