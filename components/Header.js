import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useRef } from "react";

const Header = ({ active, category, userName }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current && active) {
      const categoryButtonWidth = 100; // Adjust the width of each category button accordingly
      const contentOffset = (active - 1) * categoryButtonWidth;
      scrollViewRef.current.scrollTo({
        x: contentOffset,
        animated: true,
      });
    }
  }, [active]);

  return (
    <>
      {category && (
        <View style={{ backgroundColor: "#003580", paddingBottom: 15 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <View>
              <Text style={{ fontSize: 18, color: "white", paddingBottom: 15 }}>
                Welcome,{" "}
                {userName && userName.length > 10 ? (
                  <Text>
                    {userName.slice(0, 10)}
                    <Text style={{ fontSize: 18 }}>...</Text>
                  </Text>
                ) : (
                  userName
                )}
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#f2f2f0",
                    paddingBottom: 0,
                    paddingTop: 10,
                    textAlign: "center",
                  }}
                >
                  Let's find you a place to relax
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!category && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          contentContainerStyle={{
            backgroundColor: !category ? "white" : "#003580",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Main")}
            style={[
              styles.categoryButton,
              active === 1 ? styles.activeCategory : null,
            ]}
          >
            <Ionicons name="bed-outline" size={20} color="gray" />
            <Text style={styles.categoryText}>Stays</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Island")}
            style={[
              styles.categoryButton,
              active === 2 ? styles.activeCategory : null,
            ]}
          >
            <Fontisto name="island" size={24} color="gray" />
            <Text style={styles.categoryText}>Tropical</Text>
          </Pressable>

          <Pressable
            //  onPress={() => navigation.navigate("Modern")}
            style={[
              styles.categoryButton,
              active === 3 ? styles.activeCategory : null,
            ]}
          >
            <FontAwesome name="diamond" size={19} color="gray" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "gray",
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
            <MaterialCommunityIcons name="campfire" size={22} color="gray" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "gray",
                fontSize: 15,
              }}
            >
              Camp Homes
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Modern")}
            style={[
              styles.categoryButton,
              active === 5 ? styles.activeCategory : null,
            ]}
          >
            <MaterialCommunityIcons
              name="home-analytics"
              size={22}
              color="gray"
            />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                color: "gray",
                fontSize: 15,
              }}
            >
              Modern
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#003580",
    // borderWidth: 1,
    // borderRadius: 25,
    padding: 8,
    marginRight: 20,
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "gray",
    fontSize: 15,
  },
  activeCategory: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#003580",
  },
});
