import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PropertyCard = ({
  rooms,
  children,
  property,
  adults,
  selectedStartDate,
  availableRooms,
}) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("Info", {
            name: property.name,
            rating: property.rating,
            oldPrice: property.oldPrice,
            newPrice: property.newPrice,
            photos: property.photos,
            availableRooms: property.rooms,
            adults: adults,
            children: children,
            rooms: rooms,
            selectedStartDate: selectedStartDate,
          })
        }
        style={{ margin: 15, flexDirection: "row", backgroundColor: "white" }}
      >
        <View>
          <Image
            style={{ height: height / 4, width: width - 240 }}
            source={{ uri: property.image }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <View style={styles.propertyName}>
            <Text style={{ width: 165 }}>{property.name}</Text>
            <AntDesign name="hearto" size={24} color="red" />
          </View>
          <View style={styles.propertyRatings}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{property.rating}</Text>
            <View
              style={{
                backgroundColor: "#6CB4EE",
                paddingVertical: 3,
                borderRadius: 5,
                width: 100,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                Genius Level
              </Text>
            </View>
          </View>

          <Text
            style={{
              width: 210,
              marginTop: 6,
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {property.address.length > 50
              ? property.address.substr(0, 50) + "..."
              : property.address}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            Price for 1 Night and {rooms} rooms
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 18,
                textDecorationLine: "line-through",
              }}
            >
              {property.oldPrice * rooms}
            </Text>
            <Text style={{ fontSize: 18 }}>Rs {property.newPrice * rooms}</Text>
          </View>

          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 16, color: "gray" }}>Deluxe Room</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              Hotel Room : 1 bed
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#6082B6",
              paddingVertical: 2,
              marginTop: 2,
              borderRadius: 5,
              width: 150,
              paddingHorizontal: 3,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Limited Time deal
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  propertyName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  propertyRatings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },
});
