import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../SavedReducer";
import { auth, db } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";
import booking from "../assets/booking-with-smartphone.json";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { categories } from "../Inputs";

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const uid = auth.currentUser.uid;

  const confirmBooking = async () => {
    const timestamp = Timestamp.fromDate(new Date()); // Create a Firestore timestamp object

    dispatch(
      savedPlaces({
        ...route.params,
        timestamp: timestamp, // Pass the timestamp as a Firestore Timestamp object
      })
    );
    setLoading(true);

    try {
      const {
        property,
        selectedStartDate,
        selectedEndDate,
        adults,
        children,
        firstName,
        lastName,
        email,
        phoneNo,
      } = route.params;

      const checkInDate = moment(selectedStartDate, "YYYY-MM-DD").toDate();
      const checkOutDate = moment(selectedEndDate, "YYYY-MM-DD").toDate();

      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      const bookingData = {
        userId: uid,
        property: property,
        selectedStartDate: selectedStartDate,
        selectedEndDate: selectedEndDate,
        numberOfDays: numberOfDays,
        adults: adults,
        children: children,
        phoneNo: phoneNo,
        firstName: firstName,
        lastName: lastName,
        email: email,
        totalPrice: numberOfDays * property.price,
        timestamp: timestamp, // Pass the Firestore timestamp object
      };

      const bookingsCollectionRef = collection(db, "bookings");
      await addDoc(bookingsCollectionRef, bookingData);

      const listingsCollectionRef = collection(db, "Listings");
      const querySnapshot = await getDocs(listingsCollectionRef);

      querySnapshot.forEach(async (doc) => {
        const listingData = doc.data();

        // Check if the listing's address matches the property's address
        if (listingData.address === property.address) {
          const placeRef = doc.ref;
          const currentPopularityCount = listingData.popularityCount || 0;
          await updateDoc(placeRef, {
            popularityCount: currentPopularityCount + 1,
          });
        }
      });

      setLoading(false);

      navigation.navigate("SuccessPage");
    } catch (error) {
      console.error("Error creating booking:", error);
      Toast.show("Error", "Failed to create booking. Please try again.", {
        type: "error",
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

  const property = route.params.property || {};

  const matchedCategories = categories.filter((category) =>
    property.category.includes(category.label)
  );

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

  if (loading) {
    return (
      <View
        style={{
          margin: loading ? 0 : 20,
          flexGrow: 1,
          justifyContent: loading ? "center" : undefined,
          alignItems: loading ? "center" : undefined,
        }}
      >
        <Lottie source={Loader2} autoPlay loop style={styles.animation} />
      </View>
    );
  }

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
          style={{ backgroundColor: "white", margin: 20, marginTop: 50 }}
        >
          <View
            style={{
              marginTop: 10,
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
                  gap: 15,
                  marginTop: 7,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Feather name="star" size={24} color="black" />
                  <Text style={{ fontSize: 18 }}>{property.rating}</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome name="flag-checkered" size={20} color="black" />
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {property.country}
                  </Text>
                </View>
                {matchedCategories.map((category, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      alignItems: "center",
                    }}
                  >
                    {category.icon}
                    <Text
                      style={{
                        color: "gray",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {category.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
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
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Per night: ${property.price}
              </Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 19,
                }}
              >
                {getNumberOfDays()} night
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
