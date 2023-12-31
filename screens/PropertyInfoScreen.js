import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import { Entypo } from "@expo/vector-icons";

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
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
  const difference = route.params.oldPrice - route.params.newPrice;
  const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: 10,
              }}
            >
              {route.params.photos.slice(0, 5).map((photo) => (
                <View key={photo.id} style={{ margin: 6 }}>
                  <Image
                    style={{
                      width: 300,
                      height: 350,
                      borderRadius: 4,
                    }}
                    source={{ uri: photo.image }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              marginHorizontal: 12,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {route.params.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 7,
                }}
              >
                <MaterialIcons name="stars" size={24} color="green" />
                <Text>{route.params.rating}</Text>
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 3,
                    paddingVertical: 3,
                    borderRadius: 5,
                    width: 100,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 15,
                    }}
                  >
                    Guest friendly
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#0B3A2C",
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 6,
                marginTop: 10,
                width: 100,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 13 }}>
                type: {route.params.category}
              </Text>
            </View>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              fontWeight: "500",
              marginHorizontal: 12,
            }}
          >
            Price for 1 Night and {route.params.rooms} room
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
              marginTop: 4,
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 20,
                textDecorationLine: "line-through",
              }}
            >
              {route.params.oldPrice * route.params.rooms}
            </Text>
            <Text style={{ fontSize: 20 }}>
              Rs {route.params.newPrice * route.params.rooms}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 12,
              marginTop: 7,
              backgroundColor: "#0B3A2C",
              paddingHorizontal: 4,
              paddingVertical: 5,
              width: 78,
              borderRadius: 4,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              {offerPrice.toFixed(0)} % OFF
            </Text>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />

          <View style={{ margin: 12 }}>
            <Text
              style={{
                fontSize: 18,
                color: "gray",
                fontWeight: "600",
                marginBottom: 3,
              }}
            >
              You can alway reselect the information beneath in the home menu
            </Text>
            <Pressable
              style={{
                width: "100%",
                backgroundColor: "white",
                elevation: 3,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                paddingVertical: 10,
              }}
              onPress={() =>
                navigation.navigate("Home", {
                  placeName: route.params.placeName,
                  rooms: route.params.rooms,
                  children: route.params.children,
                  adults: route.params.adults,
                  selectedStartDate: route.params.selectedStartDate,
                  selectedEndDate: route.params.selectedEndDate,
                })
              }
            >
              <Entypo name="home" size={24} color="#003580" />
              <Text style={{ fontSize: 16, fontWeight: "600" }}>Home</Text>
            </Pressable>
          </View>

          <View
            style={{
              margin: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
              >
                Check In
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
              >
                {route.params.selectedStartDate}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
              >
                Check Out
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
              >
                {route.params.selectedEndDate}
              </Text>
            </View>
          </View>
          <View style={{ margin: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Rooms and Guests
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
              {route.params.rooms} rooms • {route.params.adults} adults •{" "}
              {route.params.children} children
            </Text>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
          <Amenities />

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={() =>
          navigation.navigate("Rooms", {
            rooms: route.params.availableRooms,
            oldPrice: route.params.oldPrice,
            newPrice: route.params.newPrice,
            room: route.params.rooms,
            name: route.params.name,
            children: route.params.children,
            adults: route.params.adults,
            rating: route.params.rating,
            category: route.params.category,
            selectedStartDate: route.params.selectedStartDate,
            selectedEndDate: route.params.selectedEndDate,
          })
        }
        style={{
          backgroundColor: "#6CB4EE",
          position: "absolute",
          bottom: 0,
          padding: 15,
          width: "100%",
          // marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Select Availabilty
        </Text>
      </Pressable>
    </>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({});
