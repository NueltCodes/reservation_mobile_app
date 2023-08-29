import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BookingScreen from "./screens/BookingScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SavedScreen from "./screens/SavedScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./screens/SearchScreen";
import PlacesScreen from "./screens/PlacesScreen";
import MapScreen from "./screens/MapScreen";
import PropertyInfoScreen from "./screens/PropertyInfoScreen";
import RoomsScreen from "./screens/RoomsScreen";
import UserScreen from "./screens/UserScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import IslandScreen from "./screens/IslandScreen";
import ListingInfo from "./screens/ListingInfo";
import SuccessPage from "./screens/SuccessPage";
import ModernScreen from "./screens/ModernScreen";
import LuxuryScreen from "./screens/LuxuryScreen";
import CampScreen from "./screens/CampScreen";
import OmgScreen from "./screens/OmgScreen";

const StackNavigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        {/* <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarLabel: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="#003580" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              ),
          }}
        /> */}

        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: "Bookings",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="notifications" size={24} color="#003580" />
              ) : (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Island"
          component={IslandScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Luxury"
          component={LuxuryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camp"
          component={CampScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Modern"
          component={ModernScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Omg"
          component={OmgScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Places" component={PlacesScreen} />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Info" component={PropertyInfoScreen} />
        <Stack.Screen name="ListingInfo" component={ListingInfo} />
        <Stack.Screen name="Rooms" component={RoomsScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="SuccessPage" component={SuccessPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
