import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = auth.currentUser;

  const fetchUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserInfo(userData);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

  const storage = getStorage();

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const user = auth.currentUser;
      const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      await uploadBytes(imageRef, imageUri);
      console.log("Image uploaded successfully");
      // You can update the user's profile document in Firestore to store the image URL or any other relevant information
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const deleteImage = async () => {
    try {
      const user = auth.currentUser;
      const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setImage(null);
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImageToFirebase(result.assets[0].uri);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } else {
      setImage(null);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Redirect the user to a different screen or stack
        navigation.navigate("Login"); // Replace "Login" with the desired screen name
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        Alert.alert("Error", "Failed to logout. Please try again.");
      });
  };

  if (!user) {
    navigation.navigate("Login");
  }

  const handleDeleteAccount = () => {
    const user = auth.currentUser;

    // Prompt the user for confirmation before deleting the account
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            user
              .delete()
              .then(() => {
                // Redirect the user to a different screen or stack
                navigation.navigate("Login"); // Replace "Login" with the desired screen name
              })
              .catch((error) => {
                console.error("Error deleting account:", error);
                Alert.alert(
                  "Error",
                  "Failed to delete account. Please try again."
                );
              });
          },
        },
      ]
    );
  };

  if (userInfo) {
    const { fullName, email, phone } = userInfo;
    console.log(userInfo);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          {!image ? (
            <TouchableOpacity onPress={pickImage}>
              {loading ? (
                <View>
                  <ActivityIndicator
                    color={"#ff0000"}
                    animating
                    size={"large"}
                  />
                </View>
              ) : (
                <Image
                  source={require("../assets/login2.png")}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
          ) : (
            <>
              <View>
                <Image source={{ uri: image }} style={styles.profileImage} />
              </View>
              <Button title="Delete this image" onPress={deleteImage} />
            </>
          )}
          {/* <Image source={{ uri: image }} style={styles.profileImage} /> */}
          <View style={styles.body}>
            <Text style={styles.title}>Username:</Text>
            <Text style={styles.username}>{fullName}</Text>
          </View>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
          <View style={styles.body}>
            <Zocial name="gmail" size={22} color="gray" />
            <Text style={styles.title}>Email:</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
          <View style={styles.body}>
            <Feather name="phone" size={22} color="gray" />
            <Text style={styles.title}>Phone:</Text>
            <Text style={styles.phoneNumber}>{phone}</Text>
          </View>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
          <View style={styles.bodyBookings}>
            <View style={styles.body}>
              <Entypo name="book" size={22} color="gray" />
              <Text style={styles.phoneNumber}>View your bookings</Text>
            </View>
            <AntDesign
              name="arrowright"
              size={22}
              color="gray"
              style={{ marginRight: 30 }}
            />
          </View>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.body}>
              <AntDesign name="logout" size={22} color="gray" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <View style={styles.body}>
              <AntDesign name="delete" size={22} color="gray" />
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              borderColor: "#FFC72C",
              borderWidth: 1,
              height: 1,
              marginVertical: 10,
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator />;
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  profileContainer: {
    paddingHorizontal: 10,
    // alignItems: "center",
  },
  profileImage: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  bodyBookings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    // marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    // marginBottom: 20,
  },
  logoutButton: {
    // backgroundColor: "red",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    // backgroundColor: "red",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 8,
  },
  deleteButtonText: {
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
