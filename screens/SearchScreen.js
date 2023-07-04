import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";
import { Data } from "../Places";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const data = Data;
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "places");

      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
    };

    fetchProducts();
  }, [items]);
  // console.log(items);

  // console.log(items.place);
  // console.log(
  //   items.map((item) => (
  //     <>
  //       {item.properties.map((prop) => (
  //         <div key={prop.id}>{prop.name}</div>
  //       ))}
  //     </>
  //   ))
  // );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Search Places",
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

  console.log(items);

  return (
    <SafeAreaView>
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
          placeholder="Enter Your Destination"
          style={{ width: "80%" }}
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResult data={items} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
