import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Card from "../components/Card";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [userName, setUserName] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [topRatedItems, setTopRatedItems] = useState([]);
  const isFocused = useIsFocused(); // This allows the this page to fetch data ones the Hometab is mounted or active

  const PopularPlaces = async () => {
    setLoading(true);

    const user = auth.currentUser;
    let userName = "";

    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        userName = userData.fullName;
      }
    }

    const colRef = collection(db, "Listings");
    const queryRef = query(
      colRef,
      where("popularityCount", ">=", 5), // Filter by popularityCount >= 5
      orderBy("popularityCount", "desc") // Order by popularityCount in descending order
    );

    const snapshot = await getDocs(queryRef);
    const items = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      items.push(data);
    });

    const latestColRef = query(
      collection(db, "Listings"),
      orderBy("timestamp", "desc"),
      limit(50) // Fetch top 50 latest listings
    );
    const latestDocsSnap = await getDocs(latestColRef);
    const latestItems = [];

    latestDocsSnap.forEach((doc) => {
      const data = doc.data();

      latestItems.push(data);
    });

    const ratingColRef = query(
      collection(db, "Listings"),
      where("rating", ">=", 3), // Filter by popularityCount >= 5
      orderBy("rating", "desc"),
      limit(20) // Fetch top 20 highest-rated listings
    );
    const ratingDocsSnap = await getDocs(ratingColRef);
    const topRatedItems = [];

    ratingDocsSnap.forEach((doc) => {
      const data = doc.data();

      topRatedItems.push(data);
    });

    setLoading(false);

    setTopRatedItems(topRatedItems);
    setUserName(userName);
    setLatestItems(latestItems);
    setItems(items);
  };

  useEffect(() => {
    if (isFocused) {
      PopularPlaces();
    }
  }, [isFocused]);

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
      <Header active={active} category userName={userName} />

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <Header active={active} userName={userName} />

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
          Trending places
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

        <Text
          style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}
        >
          Top rated
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
            {topRatedItems.map((property, id) => (
              <Card key={id} item={property} HomeStyle={true} />
            ))}
          </View>
        </ScrollView>

        {/* <Text
          style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}
        >
          Top places
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
            {topRatedItems.map((property, id) => (
              <Card key={id} item={property} HomeStyle={true} />
            ))}
          </View>
        </ScrollView> */}

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
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                paddingVertical: 10,
                fontSize: 16,
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

        <Text style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}>
          Travel More spend less
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={{
              width: 250,
              height: 200,
              marginTop: 10,
              backgroundColor: "#003580",
              borderRadius: 10,
              padding: 10,
              marginHorizontal: 20,
              justifyContent: "center",
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
              loyality
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "500",
                lineHeight: 30,
              }}
            >
              Thank you for choosing our reservation service! Your loyalty is
              greatly appreciated, and we are committed to providing you with
              exceptional experiences.
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 250,
              height: 200,
              marginTop: 10,
              borderColor: "#E0E0E0",
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
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
            <Text style={{ fontSize: 15, fontWeight: "500", lineHeight: 30 }}>
              As our valued customer, you're eligible for a delightful 15%
              discount. Embark on 5 stays with us to unlock Level 2 and unlock
              even more exclusive benefits.
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
            <Text style={{ fontSize: 15, fontWeight: "500", lineHeight: 30 }}>
              Enjoy Discounts at participating at properties worldwide
            </Text>
          </Pressable>
        </ScrollView>

        <View
          style={{
            marginTop: 20,
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
