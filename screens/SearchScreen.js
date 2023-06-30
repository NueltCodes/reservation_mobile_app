import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";
import { Data } from "../Places";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const data = Data;
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

        <Feather name="search" size={24} color={black} />
      </View>
      <SearchResult data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
