import { Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import successMessage from "../assets/success-celebration.json";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const SuccessPage = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Successful",
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

  const navigation = useNavigation();
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
          alignSelf: "center",
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Booking Successful!
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Thank you for booking with us.
      </Text>
      <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate("Bookings")}
      >
        <Text style={styles.searchButtonText}>View Bookings</Text>
      </Pressable>
    </View>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: "#003580",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
