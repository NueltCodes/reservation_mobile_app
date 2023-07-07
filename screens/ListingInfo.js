import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { amenities, perks } from "../Inputs";
import Modal from "react-native-modals";
import ReactNativeModernDatepicker from "react-native-modern-datepicker";
import { TouchableOpacity } from "react-native";

const ListingInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const property = route.params.property;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startedDate, setStartedDate] = useState("YY/MM/DD");
  const [endedDate, setEndedDate] = useState("YY/MM/DD");
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
    setEndedDate(propDate);
  }

  function handleChangeEndDate(propDate) {
    setEndedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${property.name}`,
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

  const matchedAmenities = useMemo(() => {
    if (!property.Amenities) return [];

    return amenities.filter((amenity) =>
      property.Amenities.includes(amenity.label)
    );
  }, [property.Amenities]);

  const matchedPerks = useMemo(() => {
    if (!property.perks) return [];

    return perks.filter((perk) => property.perks.includes(perk.label));
  }, [property.perks]);

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = 150;
  const numColumns = Math.floor(screenWidth / itemWidth);

  // Here we Calculate the number of rows based on the total number of items and the number of columns
  const numRows = Math.ceil(matchedAmenities.length / numColumns);

  // I created an array of arrays to represent the grid structure
  const gridData = [];
  for (let row = 0; row < numRows; row++) {
    const rowData = matchedAmenities.slice(
      row * numColumns,
      (row + 1) * numColumns
    );
    gridData.push(rowData);
  }

  const perkRows = Math.ceil(matchedPerks.length / numColumns);

  const perkData = [];
  for (let row = 0; row < perkRows; row++) {
    const rowData = matchedPerks.slice(
      row * numColumns,
      (row + 1) * numColumns
    );
    perkData.push(rowData);
  }

  return (
    <ScrollView>
      <Swiper
        style={{ height: 400 }}
        loop={false}
        // showsPagination={false}
        index={0}
      >
        {property.photos.map((photo, index) => (
          <View key={index}>
            <Image
              source={{ uri: photo }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        ))}
      </Swiper>
      <View style={{ padding: 20 }}>
        <View>
          <Text style={{ fontWeight: 900, fontSize: 25 }}>{property.name}</Text>
        </View>
        <View style={styles.category}>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>
            {property.country}
          </Text>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>
            {property.category}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons
            name="star-sharp"
            size={18}
            color="black"
            style={styles.starIcon}
          />
          <Text style={{ fontSize: 15 }}>{property.rating}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="red" />

          <Text style={{ fontSize: 15 }}>{property.address}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            gap: 10,
          }}
        >
          <View style={styles.rooms}>
            <Ionicons name="bed-outline" size={22} color="gray" />
            <Text style={styles.options}>{property.rooms} rooms</Text>
          </View>
          <View style={styles.rooms}>
            <FontAwesome name="shower" size={22} color="gray" />
            <Text style={styles.options}>{property.bathrooms} bathroom</Text>
          </View>
          <View style={styles.rooms}>
            <FontAwesome5 name="users" size={22} color="gray" />
            <Text style={styles.options}>max guest {property.maxGuest}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              What this place offers
            </Text>
            <MaterialIcons name="local-offer" size={28} color="red" />
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "gray",
              marginTop: 30,
              textAlign: "center",
            }}
          >
            Amenities
          </Text>
          <View style={{ flexDirection: "column" }}>
            {gridData.map((rowData, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row", gap: 20 }}>
                {rowData.map((amenity, colIndex) => (
                  <View
                    key={colIndex}
                    style={{
                      flex: 1,
                      marginTop: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 8,
                    }}
                  >
                    {amenity.icon}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginLeft: 5,
                        color: "gray",
                      }}
                    >
                      {amenity.label}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "gray",
              marginTop: 30,
              textAlign: "center",
            }}
          >
            Unique features
          </Text>
          <View style={{ flexDirection: "column" }}>
            {perkData.map((rowData, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row", gap: 20 }}>
                {rowData.map((amenity, colIndex) => (
                  <View
                    key={colIndex}
                    style={{
                      flex: 1,
                      marginTop: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 8,
                    }}
                  >
                    {amenity.icon}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginLeft: 5,
                        color: "gray",
                      }}
                    >
                      {amenity.label}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text>Check after {chekIn}</Text>
          <Text> Check out before {chekOut}</Text>
        </View>
        <View>
          <Text>Are pets allowed? {pets}</Text>
          <Text>Am I allowed to smoke on the property? {smoking}</Text>
          <Text> Are party or event allowed? {party}</Text>
          <Text> Are party or event allowed? {party}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            borderColor: "#FFC72C",
            borderRadius: 6,
            borderWidth: 2,
            paddingVertical: 18,
          }}
        >
          {/*  Start date select View */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Feather
              name="calendar"
              size={24}
              color="black"
              onPress={handleOnPressStartDate}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ fontSize: 14 }}>Start Date</Text>
              <Text style={{ fontSize: 18 }}>
                {selectedStartDate ? selectedStartDate : startedDate}
              </Text>
            </TouchableOpacity>
          </View>

          {/*  End date select View */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Feather
              name="calendar"
              size={24}
              color="black"
              onPress={handleOnPressEndDate}
            />
            <TouchableOpacity onPress={handleOnPressEndDate}>
              <Text style={{ fontSize: 14 }}>End Date</Text>
              <Text style={{ fontSize: 18 }}>
                {selectedEndDate ? selectedEndDate : endedDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*  Start date Modal View */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openStartDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ReactNativeModernDatepicker
                mode="calendar"
                minimumDate={startDate}
                selected={selectedStartDate ? selectedStartDate : startedDate}
                onDateChanged={handleChangeStartDate}
                onSelectedChange={(date) => setSelectedStartDate(date)}
                options={{
                  backgroundColor: "#080516",
                  textHeaderColor: "#469ab6",
                  textDefaultColor: "#FFFFFF",
                  selectedTextColor: "#FFF",
                  mainColor: "#469ab6",
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />

              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/*  End date Modal View */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openEndDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ReactNativeModernDatepicker
                mode="calendar"
                minimumDate={selectedStartDate}
                selected={selectedEndDate ? selectedEndDate : endedDate}
                onDateChanged={handleChangeEndDate}
                onSelectedChange={(date) => setSelectedEndDate(date)}
                options={{
                  backgroundColor: "#080516",
                  textHeaderColor: "#469ab6",
                  textDefaultColor: "#FFFFFF",
                  selectedTextColor: "#FFF",
                  mainColor: "#469ab6",
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />

              <TouchableOpacity onPress={handleOnPressEndDate}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ListingInfo;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: 7,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
    marginTop: 7,
  },
  rooms: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    marginTop: 10,
    gap: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 93,
    height: 65,
    padding: 8,
  },
  options: {
    fontSize: 14,
    fontWeight: 500,
    color: "gray",
  },
});
