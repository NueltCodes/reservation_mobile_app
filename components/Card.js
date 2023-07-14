import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Card = ({ property, item, HomeStyle }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ListingInfo", {
          property: property || item,
        })
      }
    >
      <View>
        {((item?.photos || property?.photos) && item?.photos?.length > 0) |
          (property?.photos?.length > 0) && (
          <Image
            source={{ uri: item?.photos[0] || property?.photos[0] }}
            style={{
              width: "100%",
              height: HomeStyle ? 250 : 300,
              borderTopLeftRadius: HomeStyle ? 0 : 20,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 20,
            }}
          />
        )}

        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {/* This below was the old way to cut reduce the text lenghts displayed and adding ... by the end after sliceing those end text out*/}
          {/* <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 250,
            }}
          >
            {property?.name?.length > 30 || item?.name?.length > 30 ? (
              <Text>
                {(property?.name || item?.name)?.slice(0, 30)}
                <Text style={{ fontSize: 18 }}>...</Text>
              </Text>
            ) : (
              property?.name || item?.name
            )}
          </Text> */}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 250,
            }}
          >
            {property?.name || item?.name}
          </Text>

          <View style={styles.ratingContainer}>
            {Array.from(
              {
                length: Math.floor(property?.rating || item?.rating),
              },
              (_, i) => (
                <Ionicons key={i} name="star-sharp" size={18} color="#FFC72C" />
              )
            )}
            {property?.rating || item?.rating % 1 !== 0 ? (
              <Ionicons name="star-half-sharp" size={18} color="#FFC72C" />
            ) : null}
            <Text style={{ color: "black" }}>
              ({property?.rating || item?.rating})
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingTop: 6,
              alignItems: "center",
            }}
          >
            <FontAwesome name="flag-checkered" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              {property?.country || item?.country}
            </Text>
          </View>

          {!HomeStyle && !item && (
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
                  fontWeight: "500",
                  width: 250,
                }}
              >
                {property?.address || item?.address}
              </Text>
            </View>
          )}
          <View
            style={{
              backgroundColor: "#003580",
              padding: 2,
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
              ${property?.price || item?.price} per night
            </Text>
          </View>
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
    marginTop: 4,
  },
});
