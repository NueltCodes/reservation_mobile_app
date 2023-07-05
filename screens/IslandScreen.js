import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Card from "../components/Card";

const IslandScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Island",
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

  useEffect(() => {
    if (items.length > 0) return;

    setLoading(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "Island");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  return (
    <>
      {/* <View> */}
      <Header active={2} />

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: 20,
          }}
        >
          {loading ? (
            <Text>Fetching places....</Text>
          ) : (
            <View
              style={{
                backgroundColor: "#F5F5F5",
                marginBottom: 50,
                flexDirection: "column",
                gap: 20,
              }}
            >
              {items.map((property, id) => (
                <Card key={id} property={property} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default IslandScreen;

const styles = StyleSheet.create({});
