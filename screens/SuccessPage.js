import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import successMessage from "../assets/success-celebration.json";

const SuccessPage = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        source={successMessage}
        autoPlay
        loop
        style={{
          width: "100%",
          height: 300,
          marginTop: 50,
          marginBottom: 30,
          alignSelf: "center",
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Booking Successful!
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Thank you for booking with us.
      </Text>
    </View>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({});
