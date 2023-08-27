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
import { auth, db, storage } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import Toast from "react-native-root-toast";

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

  // const storage = getStorage();
  console.log(image);
  const uploadImageToFirebase = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const uploadTask = uploadBytes(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress updates if needed
        },
        (error) => {
          console.log("Error uploading image:", error);
          Toast.show("Error uploading image, please try again", {
            duration: Toast.durations.SHORT,
            position: 100,
            shadow: true,
            animation: true,
          });
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image uploaded successfully");
            // Save the download URL to the user's profile or perform any other necessary operations
            const user = auth.currentUser;

            if (user) {
              const userId = user.uid;
              const userDocRef = doc(db, "users", userId);

              // Check if the user document exists
              const userDocSnapshot = await getDoc(userDocRef);

              if (userDocSnapshot.exists()) {
                // Update the profileImageUrl field in the user's document
                await updateDoc(userDocRef, {
                  profileImageUrl: downloadURL,
                });

                Toast.show("Image uploaded successfully", {
                  duration: Toast.durations.SHORT,
                  position: 100,
                  shadow: true,
                  animation: true,
                });
              } else {
                // Create a new user document with the profileImageUrl field
                await setDoc(userDocRef, {
                  name: userInfo.name,
                  email: user.email,
                  phone: userInfo.phone,
                  profileImageUrl: downloadURL,
                });

                Toast.show("Image uploaded successfully", {
                  duration: Toast.durations.SHORT,
                  position: 100,
                  shadow: true,
                  animation: true,
                });
              }
            } else {
              console.log("User not logged in");
              Toast.show("User not logged in", {
                duration: Toast.durations.SHORT,
                position: 100,
                shadow: true,
                animation: true,
              });
            }

            Toast.show("Image uploaded successfully", {
              duration: Toast.durations.SHORT,
              position: 100,
              shadow: true,
              animation: true,
            });
          } catch (error) {
            console.log("Error getting download URL:", error);
            // Handle the error here, e.g., display an error message to the user
            Toast.show("Error getting download URL, please try again", {
              duration: Toast.durations.SHORT,
              position: 100,
              shadow: true,
              animation: true,
            });
          } finally {
            blob.close();
          }
        }
      );
    } catch (error) {
      console.log("Error uploading image:", error);
      // Handle the error here, e.g., display an error message to the user
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
      try {
        const selectedAsset = result.assets[0];
        await uploadImageToFirebase(selectedAsset.uri);
        setImage(selectedAsset.uri);
      } catch (error) {
        console.log("Error uploading image:", error);
        // Handle the error here, e.g., display an error message to the user
      }
    } else {
      setImage(null);
    }

    setLoading(false);
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
