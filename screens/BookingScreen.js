import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native";

const BookingScreen = () => {
  const uid = auth.currentUser.uid;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }

      setLoading(false);
    };

    fetchBookings();
  }, [uid]);

  if (loading) {
    return <Text>Loading...</Text>;
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
                  ${booking.newPrice} a night
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
          <Text>No bookings found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // padding: 14,
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
});
export default BookingScreen;
