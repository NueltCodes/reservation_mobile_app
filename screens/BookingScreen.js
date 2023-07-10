import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";
import { Pressable } from "react-native";

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
        collection(db, "users", uid, "bookings"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(bookingsQuery);

      const bookingsData = querySnapshot.docs.map((doc) => doc.data());
      setBookings(bookingsData);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    // we are fetching bookings whenever this screen is focused cause as I said above this screen is a bottom bottomTabScreen component so we have to know which of the screens in the bottomTab is active so as to fetch data for
    const unsubscribe = navigation.addListener("focus", () => {
      fetchBookings();
    });

    // Cleanup the listener when the component unmounts or loses focus
    return () => unsubscribe();
  }, [navigation, uid, isFocused]);

  if (loading || !dataLoaded) {
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
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <View key={index} style={styles.bookingContainer}>
              <View
                style={{
                  padding: 6,
                  borderRadius: 4,
                  width: 100,
                  backgroundColor: "#297aec",
                  // marginLeft: 4,
                  borderRadius: 5,
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
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
                  {booking.selectedStartDate}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    alignContent: "center",
                  }}
                >
                  to
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {booking.selectedEndDate}
                </Text>
                <Text
                  style={{
                    borderColor: "#E0E0E0",
                    borderWidth: 1,
                    width: "100%",
                    // alignSelf: "baseline",
                    height: 1,
                    marginTop: 15,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 19,
                  }}
                >
                  ${booking.price} a night
                </Text>
              </View>
              <View style={{ padding: 4 }}>
                <Text style={styles.name}>{booking.name}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
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
                    <Text style={{ color: "white", fontSize: 13 }}>
                      type: {booking.category}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: "white",
                      elevation: 3,
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 6,
                      marginTop: 10,
                      width: 80,
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
                      {booking.room} room
                    </Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  {Array.from(
                    { length: Math.floor(booking.rating) },
                    (_, i) => (
                      <Ionicons
                        key={i}
                        name="star-outline"
                        size={18}
                        color="#FFC72C"
                        style={styles.starIcon}
                      />
                    )
                  )}
                  {booking.rating % 1 !== 0 && (
                    <Ionicons
                      name="star-half-sharp"
                      size={18}
                      color="#FFC72C"
                      style={styles.starIcon}
                    />
                  )}
                  <Text style={{ color: "black" }}>{booking.rating}</Text>
                </View>
                <View
                  style={{
                    padding: 6,
                    borderRadius: 4,
                    width: 90,
                    marginTop: 2,
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
              </View>
            </View>
          ))
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
    flex: 1,
    backgroundColor: "red",
  },
  bookingContainer: {
    flexDirection: "row",
    borderWidth: 2,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#FFC72C",
    borderWidth: 1,
    borderRadius: 6,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
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
