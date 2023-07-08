import {
  Dimensions,
  Image,
  Pressable,
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
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { getFormatedDate } from "react-native-modern-datepicker";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Features from "../components/Features";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Dates from "../components/Dates";

const ListingInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const property = route.params.property;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startedDate, setStartedDate] = useState("YY/MM/DD");
  const [endedDate, setEndedDate] = useState("YY/MM/DD");
  const [modalVisibile, setModalVisibile] = useState(false);

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
    return true; // Return true to prevent the default back button behavior
  };

  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
    return true; // Return true to prevent the default back button behavior
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
    <>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
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
        <View style={{ margin: 20 }}>
          <View>
            <Text style={{ fontWeight: 900, fontSize: 25 }}>
              {property.name}
            </Text>
          </View>
          <View style={styles.category}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingTop: 10,
                alignItems: "center",
              }}
            >
              <FontAwesome name="flag-checkered" size={24} color="black" />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                {property.country}
              </Text>
            </View>
            <Text style={{ fontWeight: 500, fontSize: 16, color: "green" }}>
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
              justifyContent: "space-between",
              marginTop: 10,
              // gap: 10,
            }}
          >
            <View style={styles.rooms}>
              <Ionicons name="bed-outline" size={24} color="gray" />
              <Text style={styles.options}>{property.rooms} rooms</Text>
            </View>
            <View style={styles.rooms}>
              <FontAwesome name="shower" size={20} color="gray" />
              <Text style={styles.options}>{property.bathrooms} bathroom</Text>
            </View>
            <View style={styles.rooms}>
              <FontAwesome5 name="users" size={20} color="gray" />
              <Text style={styles.options}>max guest {property.maxGuest}</Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#5e5c5d" }}
              >
                What this place offers
              </Text>
              <MaterialIcons name="local-offer" size={28} color="#f25e90" />
            </View>

            <Text
              style={{
                borderColor: "#E0E0E0",
                borderWidth: 1,
                height: 1,
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#5e5c5d",
                marginTop: 30,
                textDecorationLine: "underline",
              }}
            >
              Amenities
            </Text>

            <Features gridData={gridData} />

            <Text
              style={{
                borderColor: "#E0E0E0",
                borderWidth: 1,
                height: 1,
                marginTop: 30,
              }}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#5e5c5d",
                marginTop: 30,
                textDecorationLine: "underline",
              }}
            >
              Unique features
            </Text>
            <Features gridData={perkData} />
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 1,
              height: 1,
              marginTop: 30,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#5e5c5d",
              }}
            >
              House rule
            </Text>
            <Octicons name="law" size={24} color="gray" />
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 20,
              paddingRight: 20,
              marginTop: 30,
            }}
          >
            <View style={styles.rules}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 17 }}>
                Check-in after {property.checkIn}
              </Text>
            </View>
            <View style={styles.rules}>
              <MaterialCommunityIcons
                name="timer-off-outline"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 17 }}>
                Check-out before {property.checkOut}
              </Text>
            </View>
            <View style={styles.rules}>
              <MaterialIcons name="pets" size={24} color="black" />

              <Text style={{ fontSize: 17 }}>
                {property.pets === "No" ? "No pets allowed" : "Pets allowed"}
              </Text>
            </View>
            <View style={styles.rules}>
              <MaterialCommunityIcons
                name="smoking-off"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 17 }}>
                {property.smoking === "No"
                  ? "No smoking allowed"
                  : "Smoking allowed but carefully and neatly done"}
              </Text>
            </View>
            <View style={styles.rules}>
              <MaterialCommunityIcons
                name="party-popper"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 17 }}>
                {property.party === "No"
                  ? "No party / event allowed"
                  : "Small party / event allowed but with an extra fee"}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{ fontSize: 17, color: "#5e5c5d", fontWeight: "bold" }}
            >
              Make your reservation's below:
            </Text>
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
              marginVertical: 10,
            }}
          >
            {/*  Start date select View */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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
          <Dates
            startedDate={startedDate}
            endedDate={endedDate}
            startDate={startDate}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            openStartDatePicker={openStartDatePicker}
            openEndDatePicker={openEndDatePicker}
            handleOnPressStartDate={handleOnPressStartDate}
            handleOnPressEndDate={handleOnPressEndDate}
            handleChangeStartDate={handleChangeStartDate}
            handleChangeEndDate={handleChangeEndDate}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />

          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 17, lineHeight: 30 }}>
              State your numbers and category below.
              <Text style={{ fontSize: 17, color: "red" }}>Note</Text> the
              maximum guest for this place is ({property.maxGuest}) guest max!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisibile(!modalVisibile)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={{ color: "red" }}>
              {`${adults} adults • ${children} Children`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                backgroundColor: "white",
              }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          {/* Adult Part */}
          <View style={styles.modalOptions}>
            <Text style={styles.optionsText}>Adult</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    // paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {adults}
              </Text>
              <Pressable
                onPress={() => setAdults((i) => i + 1)}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Children Part */}
          <View style={styles.modalOptions}>
            <Text style={styles.optionsText}>Children</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    // paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {children}
              </Text>
              <Pressable
                onPress={() => setChildren((i) => i + 1)}
                style={styles.actionOption}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
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
    width: 100,
    height: 65,
    padding: 8,
  },
  options: {
    fontSize: 14,
    fontWeight: 500,
    color: "gray",
  },
  rules: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  centeredView: {
    width: 300,
    backgroundColor: "#080516", // Transparent background
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  actionOption: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  optionsText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
