import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import ReactNativeModernDatepicker, {
  getFormatedDate,
} from "react-native-modern-datepicker";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import Dates from "../components/Dates";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Card from "../components/Card";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [active, setActive] = useState(1);
  const [modalVisibile, setModalVisibile] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const today = new Date();

  useEffect(() => {
    if (items?.length > 0) return;

    setLoading(true);

    const fetchProducts = async () => {
      const colRef = query(
        collection(db, "bookings"),
        orderBy("timestamp", "desc")
      );
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  // const fetchBookings = async () => {
  //   setLoading(true);
  //   try {
  //     const bookingsQuery = query(
  //       collection(db, "users", uid, "bookings"),
  //       orderBy("timestamp", "desc")
  //     );
  //     const querySnapshot = await getDocs(bookingsQuery);

  //     const bookingsData = querySnapshot.docs.map((doc) => doc.data());
  //     setBookings(bookingsData);
  //     setDataLoaded(true);
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //   }
  //   setLoading(false);
  // };
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const [startedDate, setStartedDate] = useState("YY/MM/DD");
  const [endedDate, setEndedDate] = useState("YY/MM/DD");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
    setEndedDate(propDate);
  }

  function handleChangeEndDate(propDate) {
    setEndedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
    return true; // Return true to prevent the default back button behavior
  };

  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
    return true; // Return true to prevent the default back button behavior
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Reserve.com",
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const searchPlaces = (place) => {
    if (!selectedStartDate || !selectedEndDate) {
      Alert.alert(
        "Incomplete Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (selectedStartDate && selectedEndDate) {
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        selectedStartDate: selectedStartDate,
        selectedEndDate: selectedEndDate,
        place: place,
        placeName: place,
      });
    }
  };

  return (
    <>
      {/* <View> */}
      <Header active={active} />

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderRadius: 6,
          }}
        >
          {/*  Destination Input */}
          <Pressable
            onPress={() => navigation.navigate("Search")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <Text>
              {route?.params
                ? route.params?.input || route.params.placeName
                : "Enter Your Destination"}
            </Text>
          </Pressable>

          {/*  Date select View */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 18,
            }}
          >
            {/*  Start date select View */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="calendar"
                size={24}
                color="black"
                onPress={handleOnPressStartDate}
              />
              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ fontSize: 14 }}>Start Date</Text>
                <Text style={{ fontSize: 18 }}>
                  {selectedStartDate ? selectedStartDate : startedDate}
                </Text>
              </TouchableOpacity>
            </View>

            {/*  End date select View */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="calendar"
                size={24}
                color="black"
                onPress={handleOnPressEndDate}
              />
              <TouchableOpacity onPress={handleOnPressEndDate}>
                <Text style={{ fontSize: 14 }}>End Date</Text>
                <Text style={{ fontSize: 18 }}>
                  {selectedEndDate ? selectedEndDate : endedDate}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*  Start date Modal View */}

          <Dates
            startedDate={startedDate}
            endedDate={endedDate}
            startDate={startDate}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            openStartDatePicker={openStartDatePicker}
            openEndDatePicker={openEndDatePicker}
            handleOnPressStartDate={handleOnPressStartDate}
            handleOnPressEndDate={handleOnPressEndDate}
            handleChangeStartDate={handleChangeStartDate}
            handleChangeEndDate={handleChangeEndDate}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />
          {/*  Room and Guest View */}
          <TouchableOpacity
            onPress={() => setModalVisibile(!modalVisibile)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={{ color: "red" }}>
              {` ${rooms} room • ${adults} adults • ${children} Children`}
            </Text>
          </TouchableOpacity>

          {/*  Search View */}
          <Pressable
            onPress={() =>
              searchPlaces(
                route?.params?.input ||
                  (route.params ? route.params.placeName : "")
              )
            }
            style={{
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
              backgroundColor: "#2a52be",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
                color: "white",
              }}
            >
              Search
            </Text>
          </Pressable>
        </View>

        <Text
          style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}
        >
          Popular Places
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
              margin: 10,
              marginHorizontal: 20,
            }}
          >
            {items.map((property, id) => (
              <Card key={id} item={property} HomeStyle={true} />
            ))}
          </View>
        </ScrollView>

        <Text style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}>
          Travel More spend less
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              backgroundColor: "#003580",
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              Genius
            </Text>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
              You are at genius level one in our loyalty program
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              borderColor: "#E0E0E0",
              borderWidth: 2,
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              15% Discounts
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Complete 5 stays to unlock level 2
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              borderColor: "#E0E0E0",
              borderWidth: 2,
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              10% Discounts
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Enjoy Discounts at participating at properties worldwide
            </Text>
          </Pressable>
        </ScrollView>

        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: "900",
              color: "#003580",
              paddingTop: 40,
              paddingBottom: 50,
            }}
          >
            Reservation.com
          </Text>
        </View>
      </ScrollView>
      {/* </View> */}

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                backgroundColor: "white",
              }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View style={styles.options}>
            <Text style={styles.optionsText}>Rooms</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    // paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {rooms}
              </Text>
              <Pressable
                onPress={() => setRooms((i) => i + 1)}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Adult Part */}
          <View style={styles.options}>
            <Text style={styles.optionsText}>Adult</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    // paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {adults}
              </Text>
              <Pressable
                onPress={() => setAdults((i) => i + 1)}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Children Part */}
          <View style={styles.options}>
            <Text style={styles.optionsText}>Children</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    // paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {children}
              </Text>
              <Pressable
                onPress={() => setChildren((i) => i + 1)}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  actionOption: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  optionsText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
