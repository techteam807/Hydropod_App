import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../Screen/Home/Home";
import Activity from "../Screen/Home/Activity";
import Profile from "../Screen/Home/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = ({ setUserToken }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home-outline";
          else if (route.name === "Activity") icon = "list-outline";
          else if (route.name === "Profile") icon = "person-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <Home {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
