import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../SavedReducer";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Lottie from "lottie-react-native";
import booking from "../assets/booking-with-smartphone.json";

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const uid = auth.currentUser.uid;

  const confirmBooking = async () => {
    dispatch(savedPlaces(route.params));

    try {
      const bookingsCollectionRef = collection(db, "users", uid, "bookings");
      const bookingData = {
        ...route.params,
        timestamp: serverTimestamp(),
      };

      await addDoc(bookingsCollectionRef, bookingData);

      navigation.navigate("Main");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Confirmation",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerTintColor: "white",
    });
  }, []);

  const property = route.params.property;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Lottie
          source={booking}
          autoPlay
          loop
          style={{
            width: "100%",
            height: 300,
            marginTop: 50,
            marginBottom: 30,
            alignSelf: "center",
          }}
        />
        <Pressable
          style={{ backgroundColor: "white", margin: 10, marginTop: 50 }}
        >
          <View
            style={{
              marginHorizontal: 12,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {property.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 7,
                }}
              >
                <Feather name="star" size={24} color="black" />
                <Text>{property.rating}</Text>
                <View
                  style={{
                    backgroundColor: "#003580",
                    paddingVertical: 3,
                    borderRadius: 5,
                    width: 100,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {property.country}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#0B3A2C",
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 6,
                marginTop: 10,
                width: 100,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {property.category}
              </Text>
            </View>
          </View>

          <View
            style={{
              margin: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 60,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
              >
                Check In
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
                {route.params.selectedStartDate}
              </Text>
            </View>

            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
              >
                Check Out
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
                {route.params.selectedEndDate}
              </Text>
            </View>
          </View>
          <View style={{ margin: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Total price
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
              {property.price} {route.params.children} children
            </Text>
          </View>
          <View style={{ margin: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Rooms and Guests
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
              {property.rooms} rooms • {route.params.adults} adults •{" "}
              {route.params.children} children
            </Text>
          </View>

          <Pressable
            onPress={confirmBooking}
            style={{
              backgroundColor: "#003580",
              width: 120,
              padding: 5,
              marginHorizontal: 12,
              marginBottom: 20,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Book Now
            </Text>
          </Pressable>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
