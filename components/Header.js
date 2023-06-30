import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={{ backgroundColor: "#003580", paddingVertical: 15 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            backgroundColor: "#003580",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 25,
              padding: 8,
              marginRight: 20,
            }}
          >
            <Ionicons name="bed-outline" size={20} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Stays
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Ionicons name="ios-airplane-outline" size={20} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Flights
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Ionicons name="car-outline" size={20} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Car Rental
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <FontAwesome5 name="uber" size={20} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Taxi
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
