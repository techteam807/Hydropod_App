import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../Screen/Home/Home";
import { Ionicons } from "@expo/vector-icons";
import Activity from "../Screen/Activity/Activity";
import Profile from "../Screen/Profile/Profile";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const AppNavigator = ({ setUserToken }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#32516e",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let icon =
            route.name === "Home"
              ? "home-outline"
              : route.name === "Activity"
              ? "list-outline"
              : "person-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />

      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
