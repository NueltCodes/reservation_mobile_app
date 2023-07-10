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
          property: property || item.property,
        })
      }
    >
      <View>
        {((item?.property?.photos || property?.photos) &&
          item?.property?.photos?.length > 0) |
          (property?.photos?.length > 0) && (
          <Image
            source={{ uri: item?.property?.photos[0] || property?.photos[0] }}
            style={{
              width: "100%",
              height: HomeStyle ? 250 : 300,
              borderTopLeftRadius: HomeStyle ? 0 : 20,
              borderBottomRightRadius: HomeStyle ? 50 : 0,
              borderTopRightRadius: HomeStyle ? 100 : 20,
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
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 250,
            }}
          >
            {property?.name?.length > 40 ||
            item?.property?.name?.length > 40 ? (
              <Text>
                {(property?.name || item?.property?.name)?.slice(0, 40)}
                <Text style={{ fontSize: 18 }}>...</Text>
              </Text>
            ) : (
              property?.name || item?.property?.name
            )}
          </Text>

          <View style={styles.ratingContainer}>
            {Array.from(
              {
                length: Math.floor(property?.rating || item?.property?.rating),
              },
              (_, i) => (
                <Ionicons key={i} name="star-sharp" size={18} color="#FFC72C" />
              )
            )}
            {property?.rating || item?.property?.rating % 1 !== 0 ? (
              <Ionicons name="star-half-sharp" size={18} color="#FFC72C" />
            ) : null}
            <Text style={{ color: "black" }}>
              ({property?.rating || item?.property?.rating})
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
              {property?.country || item?.property?.country}
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
                {property?.address || item?.property?.address}
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
              ${property?.price || item.property.price} per night
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
