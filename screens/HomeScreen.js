import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import ReactNativeModernDatepicker, {
  getFormatedDate,
} from "react-native-modern-datepicker";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisibile, setModalVisibile] = useState(false);
  const route = useRoute();
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const [startedDate, setStartedDate] = useState("YY/MM/DD");
  const [endedDate, setEndedDate] = useState("YY/MM/DD");

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
      title: "Reserve.com",
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const searchPlaces = (place) => {
    if (!route.params || !selectedStartDate || !selectedEndDate) {
      Alert.alert(
        "Incomplete Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (route.params && selectedStartDate && selectedEndDate) {
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        selectedStartDate: selectedStartDate,
        selectedEndDate: selectedEndDate,
        place: place,
        placeName: place,
      });
    }
  };

  return (
    <>
      {/* <View> */}
      <Header />

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderRadius: 6,
          }}
        >
          {/*  Destination Input */}
          <Pressable
            onPress={() => navigation.navigate("Search")}
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
            <Feather name="search" size={24} color="black" />
            <Text>
              {route?.params
                ? route.params?.input || route.params.placeName
                : "Enter Your Destination"}
            </Text>
          </Pressable>

          {/*  Date select View */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 18,
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

          {/*  Room and Guest View */}
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
              {` ${rooms} room • ${adults} adults • ${children} Children`}
            </Text>
          </TouchableOpacity>

          {/*  Search View */}
          <Pressable
            onPress={() =>
              searchPlaces(route?.params?.input || route.params.placeName)
            }
            style={{
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
              backgroundColor: "#2a52be",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
                color: "white",
              }}
            >
              Search
            </Text>
          </Pressable>
        </View>

        <Text style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}>
          Travel More spend less
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              backgroundColor: "#003580",
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              Genius
            </Text>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
              You are ate genius level one in our loyalty program
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              borderColor: "#E0E0E0",
              borderWidth: 2,
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              15% Discounts
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Complete 5 stays to unlock level 2
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
              borderColor: "#E0E0E0",
              borderWidth: 2,
              borderRadius: 10,
              padding: 20,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              10% Discounts
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Enjoy Discounts at participating at properties worldwide
            </Text>
          </Pressable>
        </ScrollView>

        <Pressable
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 200, height: 50, resizeMode: "cover" }}
            source={{
              uri:
                "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
            }}
          />
        </Pressable>
      </ScrollView>
      {/* </View> */}

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
          <View style={styles.options}>
            <Text style={styles.optionsText}>Rooms</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
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
                {rooms}
              </Text>
              <Pressable
                onPress={() => setRooms((i) => i + 1)}
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

          {/* Adult Part */}
          <View style={styles.options}>
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
          <View style={styles.options}>
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

export default HomeScreen;

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  options: {
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
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
});
