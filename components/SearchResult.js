import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.country.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                onPress={() => {
                  setInput(item.country);
                  navigation.navigate("ListingInfo", {
                    // input: item.country,
                    property: item,
                  });
                }}
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                {item.photos && item.photos.length > 0 && (
                  <View>
                    <Image
                      style={{ width: 70, height: 100 }}
                      source={{ uri: item.photos[0] }}
                    />
                  </View>
                )}
                <View style={{ marginLeft: 10 }}>
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

                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                      {item.country}
                    </Text>
                  </View>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 18, paddingTop: 4 }}
                  >
                    {item.name.length > 40
                      ? item.name && item.name.slice(0, 40) + "..."
                      : item.name}
                  </Text>
                  <Text
                    style={{ marginVertical: 4, width: 250, lineHeight: 25 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.address}
                  </Text>

                  <View style={styles.ratingContainer}>
                    {Array.from({ length: Math.floor(item.rating) }, (_, i) => (
                      <Ionicons
                        key={i}
                        name="star-sharp"
                        size={18}
                        color="#FFC72C"
                        style={styles.starIcon}
                      />
                    ))}
                    {item.rating % 1 !== 0 && (
                      <Ionicons
                        name="star-half-sharp"
                        size={18}
                        color="#FFC72C"
                        style={styles.starIcon}
                      />
                    )}
                    <Text style={{ color: "black" }}>({item.rating})</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#003580",
                      padding: 1,
                      marginTop: 5,
                      width: 120,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      ${item.price} per night
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
});
