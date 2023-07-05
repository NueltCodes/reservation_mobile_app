import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ active }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#003580", paddingVertical: 15 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: "#003580",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Main")}
            style={[
              styles.categoryButton,
              active === 1 ? styles.activeCategory : null,
            ]}
          >
            <Ionicons name="bed-outline" size={20} color="white" />
            <Text style={styles.categoryText}>Stays</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Island")}
            style={[
              styles.categoryButton,
              active === 2 ? styles.activeCategory : null,
            ]}
          >
            <Fontisto name="island" size={24} color="white" />
            <Text style={styles.categoryText}>Island</Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <FontAwesome name="diamond" size={19} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Luxury
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <MaterialCommunityIcons name="campfire" size={22} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Camp Homes
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <MaterialCommunityIcons
              name="home-analytics"
              size={22}
              color="white"
            />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Modern
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#003580",
    borderWidth: 1,
    borderRadius: 25,
    padding: 8,
    marginRight: 20,
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  activeCategory: {
    borderColor: "white",
  },
});
