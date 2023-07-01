import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";
import { Data } from "../Places";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const data = Data;
  const navigation = useNavigation();

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
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResult data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
