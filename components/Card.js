import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ property }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ListingInfo", {
          property: property,
        })
      }
    >
      {property.photos && property.photos.length > 0 && (
        <Image
          source={{ uri: property.photos[0] }} // Access the first image using property.photos[0]
          style={{
            width: "100%",
            height: 300,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      )}
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, paddingTop: 4 }}>
          {property.name.length > 40
            ? property.name && property.name.slice(0, 40) + "..."
            : property.name}
        </Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: Math.floor(property.rating) }, (_, i) => (
            <Ionicons
              key={i}
              name="star-sharp"
              size={18}
              color="#FFC72C"
              style={styles.starIcon}
            />
          ))}
          {property.rating % 1 !== 0 && (
            <Ionicons
              name="star-half-sharp"
              size={18}
              color="#FFC72C"
              style={styles.starIcon}
            />
          )}
          <Text style={{ color: "black" }}>({property.rating})</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="flag" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: 600 }}>
            {property.country}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 5,
            gap: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={20} color="red" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "gray",
              fontSize: 15,
              fontWeight: 500,
              width: 250,
            }}
          >
            {property.address}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#003580",
            padding: 5,
            marginTop: 5,
            width: 150,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
            }}
          >
            ${property.price} per night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
});
