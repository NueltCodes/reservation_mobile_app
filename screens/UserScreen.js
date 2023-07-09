import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import moment from "moment";

const UserScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "User Details",
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

  const finalStep = () => {
    if (!firstName || !lastName || !email || !phoneNo) {
      Alert.alert(
        "Invalide Details",
        "Please ente all the fields",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ],
        { cancelable: false }
      );
    }
    if (firstName && lastName && email && phoneNo) {
      navigation.navigate("Confirmation", {
        property: property,
        selectedStartDate: route.params.selectedStartDate,
        selectedEndDate: route.params.selectedEndDate,
        children: route.params.children,
        adults: route.params.adults,
      });
    }
  };

  const property = route.params.property;

  const getNumberOfDays = () => {
    const checkInDate = moment(
      route.params.selectedStartDate,
      "YYYY-MM-DD"
    ).toDate();
    const checkOutDate = moment(
      route.params.selectedEndDate,
      "YYYY-MM-DD"
    ).toDate();

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return numberOfDays;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ margin: 20 }}
      >
        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
          <Text>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
          <Text>Email</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
          <Text>Phone no</Text>
          <TextInput
            keyboardType="phone-pad"
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
          />
        </View>
      </ScrollView>

      <Pressable
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          marginBottom: 10,
          padding: 10,
          gap: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "column",
              paddingTop: 4,
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 19,
              }}
            >
              {getNumberOfDays()} night
            </Text>
            <Text style={{ fontSize: 18 }}>Per night: ${property.price}</Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              backgroundColor: "#0B3A2C",
              padding: 5,
              borderRadius: 5,
              width: 230,
              textAlign: "center",
              color: "white",
            }}
          >
            Total fees ${getNumberOfDays() * property.price}
          </Text>
        </View>
        <Pressable
          onPress={finalStep}
          style={{
            backgroundColor: "#a9c5f5",
            elevation: 7,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Confirm
          </Text>
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
