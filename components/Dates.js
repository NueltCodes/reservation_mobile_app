import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReactNativeModernDatepicker, {
  getFormatedDate,
} from "react-native-modern-datepicker";
import Modal from "react-native-modals";
import { TouchableOpacity } from "react-native";

const Dates = ({
  handleOnPressStartDate,
  handleOnPressEndDate,
  openEndDatePicker,
  openStartDatePicker,
  startDate,
  startedDate,
  endedDate,
  selectedStartDate,
  selectedEndDate,
  handleChangeStartDate,
  handleChangeEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {
  //   const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  //   const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  //   const [selectedStartDate, setSelectedStartDate] = useState("");
  //   const [selectedEndDate, setSelectedEndDate] = useState("");
  //   const today = new Date();

  //   const startDate = getFormatedDate(
  //     today.setDate(today.getDate() + 1),
  //     "YYYY/MM/DD"
  //   );

  //   const [startedDate, setStartedDate] = useState("YY/MM/DD");
  //   const [endedDate, setEndedDate] = useState("YY/MM/DD");

  //   function handleChangeStartDate(propDate) {
  //     setStartedDate(propDate);
  //     setEndedDate(propDate);
  //   }

  //   function handleChangeEndDate(propDate) {
  //     setEndedDate(propDate);
  //   }

  //   const handleOnPressStartDate = () => {
  //     setOpenStartDatePicker(!openStartDatePicker);
  //   };

  //   const handleOnPressEndDate = () => {
  //     setOpenEndDatePicker(!openEndDatePicker);
  //   };

  return (
    <View>
      {/*  Start date Modal View */}
      <Modal
        animationType="slide"
        transparent={true}
        onHardwareBackPress={handleOnPressStartDate}
        visible={openStartDatePicker}
      >
        <View style={styles.centeredView} onPress={handleOnPressStartDate}>
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
              <Text style={{ color: "white", fontWeight: "bold" }}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*  End date Modal View */}
      <Modal
        animationType="slide"
        transparent={true}
        onHardwareBackPress={handleOnPressEndDate}
        visible={openEndDatePicker}
      >
        <View style={styles.centeredView} onPress={handleOnPressEndDate}>
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
              <Text style={{ color: "white", fontWeight: "bold" }}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dates;

const styles = StyleSheet.create({
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
});
