import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Button } from "react-native";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { categories } from "../Inputs";
import Toast from "react-native-root-toast";
import { Alert } from "react-native";

const BookingScreen = () => {
  const uid = auth.currentUser.uid;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // This allows the this page to fetch bookings ones the tabScreen is mounted or active

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
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

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(bookingsQuery);

      const bookingsData = querySnapshot.docs.map((doc) => doc.data());
      setBookings(bookingsData);
      console.log("Bookings:", bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchBookings();
    }
  }, [isFocused]);

  const deleteBooking = async (userId) => {
    try {
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(bookingsQuery);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      fetchBookings();

      Toast.show("Booking deleted successfully.", {
        duration: Toast.durations.LONG,
        position: 100,
        shadow: true,
        animation: true,
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      Toast.show("Error deleting booking, please try again later.", {
        duration: Toast.durations.SHORT,
        position: 100,
        shadow: true,
        animation: true,
      });
    }
  };

  const handleDelete = (userId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this booking?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBooking(userId),
        },
      ],
      { cancelable: true }
    );
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
    <SafeAreaView>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            const matchedCategories = categories.filter((category) =>
              booking.property.category.includes(category.label)
            );

            return (
              <View key={index} style={styles.bookingContainer}>
                <View style={{ padding: 4 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={styles.name}>
                      {booking.property.name.length > 20
                        ? booking.property.name &&
                          booking.property.name.slice(0, 20) + "..."
                        : booking.property.name}
                    </Text>
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
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          {category.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons
                      name="star-sharp"
                      size={18}
                      color="#0B3A2C"
                      style={styles.starIcon}
                    />
                    <Text style={{ fontSize: 15 }}>
                      {booking.property.rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 6,
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 7,
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "black",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        {booking.selectedStartDate}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 14,
                          alignContent: "center",
                        }}
                      >
                        to
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "black",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        {booking.selectedEndDate}
                      </Text>
                      {/* <Text
                  style={{
                    borderColor: "#E0E0E0",
                    borderWidth: 1,
                    width: "100%",
                    // alignSelf: "baseline",
                    height: 1,
                    marginTop: 15,
                  }}
                /> */}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {booking.property.rooms}{" "}
                        {booking.property.rooms > 1 ? "rooms" : "room"}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {booking.numberOfDays}{" "}
                        {booking.numberOfDays > 1 ? "nights" : "night"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="flag-checkered"
                          size={24}
                          color="black"
                        />
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          {booking.property.country}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        ${booking.property.price} a night
                      </Text>
                      <AntDesign name="arrowright" size={24} color="gray" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black",
                          textDecorationLine: "underline",
                        }}
                      >
                        Total price ${booking.totalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      padding: 6,
                      borderRadius: 4,
                      width: 100,
                      marginTop: 5,
                      alignSelf: "flex-end",
                      backgroundColor: "#FFC72C",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: 13,
                        alignItems: "center",
                        fontWeight: "400",
                      }}
                    >
                      {moment(booking.timestamp.toDate()).fromNow()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      paddingVertical: 3,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                    onPress={() => handleDelete(booking.userId)}
                  >
                    Delete
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noBookingsContainer}>
            <Text style={styles.noBookingsText}>
              Seems like you haven't made any reservations yet.
            </Text>
            <Text style={styles.noBookingsSubText}>
              Start exploring and book your perfect place!
            </Text>
            <Pressable
              style={styles.searchButton}
              onPress={() => navigation.navigate("Search")}
            >
              <Text style={styles.searchButtonText}>Search for a Place</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: "100%",
    height: 300,
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  bookingContainer: {
    flexDirection: "column",
    backgroundColor: "#f2f7fa",
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 4,
    borderRadius: 10,
    padding: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: 7,
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 15,
    fontWeight: "400",
    color: "green",
  },
  noBookingsContainer: {
    marginTop: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noBookingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noBookingsSubText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
  },
  searchButton: {
    backgroundColor: "#003580",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default BookingScreen;
