import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Card from "../components/Card";
import Lottie from "lottie-react-native";
import Loader2 from "../assets/loading2.json";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import NoResult from "../assets/no-result-found.json";

const IslandScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Island",
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

  useEffect(() => {
    if (items.length > 0) return;

    setLoading(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "Listings");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  const filterProperties = () => {
    if (input.trim() === "") {
      return items; // Return all properties if search input is empty
    } else {
      return items.filter((property) =>
        property.name.toLowerCase().includes(input.toLowerCase())
      );
    }
  };

  const renderProperties = () => {
    const filteredProperties = filterProperties();
    if (filteredProperties.length === 0) {
      return (
        <View style={styles.noResultContainer}>
          <Lottie
            source={NoResult}
            autoPlay
            loop
            style={{ width: "100%", height: 300 }}
          />
          <Text style={styles.noResultText}>
            No apartment matching this name found.
          </Text>
          <Text style={styles.suggestionText}>
            Please try searching with a different name.
          </Text>
        </View>
      );
    }
    return filteredProperties.map((property, id) => (
      <Card key={id} property={property} />
    ));
  };

  return (
    <>
      {/* <View> */}
      <Header active={2} />
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#FFC72C",
          borderWidth: 4,
          borderRadius: 10,
        }}
      >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Search by name of apartments"
          style={{ width: "80%" }}
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: loading ? 0 : 20,
            flex: loading ? 1 : undefined,
            justifyContent: loading ? "center" : undefined,
            alignItems: loading ? "center" : undefined,
          }}
        >
          {loading ? (
            <>
              <Lottie source={Loader2} autoPlay loop style={styles.animation} />
            </>
          ) : (
            <View
              style={{
                backgroundColor: "#F5F5F5",
                marginBottom: 50,
                flexDirection: "column",
                gap: 20,
              }}
            >
              {renderProperties()}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default IslandScreen;

const styles = StyleSheet.create({
  animation: {
    width: "100%",
    height: 300,
    marginTop: 50,
  },
  noResultContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  suggestionText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});
