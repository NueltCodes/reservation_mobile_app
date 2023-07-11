import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Card from "../components/Card";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";

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
  const [latestItems, setLatestItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const today = new Date();
  const isFocused = useIsFocused(); // This allows the this page to fetch bookings ones the tabScreen is mounted or active

  const PopularPlaces = async () => {
    setLoading(true);
    const colRef = query(
      collection(db, "Listings"),
      orderBy("popularityCount", "desc"),
      limit(5) // Fetch top 5 popular places
    );
    const docsSnap = await getDocs(colRef);
    const uniqueItems = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();

      // Checking if the item already exists in the uniqueItems array
      const exists = uniqueItems.some((item) => item.id === data.id); // Assuming the item has a unique identifier 'id'

      // Add the item to uniqueItems array if it doesn't exist
      if (!exists) {
        uniqueItems.push(data);
      }
    });

    const latestColRef = query(
      collection(db, "Listings"),
      orderBy("timestamp", "desc"),
      limit(5) // Fetch top 5 latest listings
    );
    const latestDocsSnap = await getDocs(latestColRef);
    const latestItems = [];

    latestDocsSnap.forEach((doc) => {
      const data = doc.data();

      latestItems.push(data);
    });

    setLoading(false);

    setLatestItems(latestItems);
    setItems(uniqueItems);
  };

  useEffect(() => {
    if (isFocused) {
      PopularPlaces();
    }
  }, [isFocused]);

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
        </View>

        <Text
          style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}
        >
          Popular places
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          >
            {items.map((property, id) => (
              <Card key={id} item={property} HomeStyle={true} />
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            onPress={() => navigation.navigate("Search")}
            style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}
          >
            New arrivals
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Search")}
            style={{
              marginHorizontal: 10,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                fontSize: 18,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              See more
            </Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          >
            {latestItems.map((property, id) => (
              <Card key={id} item={property} HomeStyle={true} />
            ))}
          </View>
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
  animation: {
    width: "100%",
    height: 300,
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
