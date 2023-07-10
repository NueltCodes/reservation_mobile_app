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
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const uid = auth.currentUser.uid;

  const confirmBooking = async () => {
    dispatch(savedPlaces(route.params));

    try {
      const {
        property,
        selectedStartDate,
        selectedEndDate,
        adults,
        children,
      } = route.params;

      const checkInDate = moment(selectedStartDate, "YYYY-MM-DD").toDate();
      const checkOutDate = moment(selectedEndDate, "YYYY-MM-DD").toDate();

      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      const bookingData = {
        user: uid,
        property: property,
        selectedStartDate: selectedStartDate,
        selectedEndDate: selectedEndDate,
        numberOfDays: numberOfDays,
        adults: adults,
        children: children,
        totalPrice: numberOfDays * property.price,
        timestamp: serverTimestamp(),
      };

      const bookingsCollectionRef = collection(db, "bookings");

      await addDoc(bookingsCollectionRef, bookingData);

      navigation.navigate("SuccessPage");
    } catch (error) {
      console.error("Error creating booking:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create booking. Please try again.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
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

  const getNumberOfDays = () => {
    const checkInDate = moment(
      route.params.selectedStartDate,
      "YYYY-MM-DD"
    ).toDate();
    const checkOutDate = moment(
      route.params.selectedEndDate,
      "YYYY-MM-DD"
    ).toDate();

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return numberOfDays;
  };

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
                    backgroundColor: "black",
                    elevation: 4,
                    paddingVertical: 3,
                    borderRadius: 5,
                    width: 150,
                    marginLeft: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Ionicons name="location" size={20} color="red" />
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {property.country}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#0B3A2C",
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 6,
              marginTop: 15,
              width: 110,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              {property.category}
            </Text>
          </View>

          <View
            style={{
              marginVertical: 15,
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
          <View>
            <View
              style={{
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 19,
                }}
              >
                {getNumberOfDays()} night
              </Text>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Per night: ${property.price}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                backgroundColor: "#2c3154",
                padding: 5,
                borderRadius: 5,
                width: 230,
                textAlign: "center",
                color: "white",
              }}
            >
              Total fees ${getNumberOfDays() * property.price}
            </Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 3 }}>
              Rooms and Guests
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              {property.rooms} rooms • {route.params.adults} adults •{" "}
              {route.params.children} children
            </Text>
          </View>

          <Pressable
            onPress={confirmBooking}
            style={{
              backgroundColor: "#003580",
              width: "100%",
              padding: 10,
              marginVertical: 20,
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
