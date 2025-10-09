import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home/Home";
import Activity from "../screens/Home/Activity";
import Profile from "../screens/Home/Profile";
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
