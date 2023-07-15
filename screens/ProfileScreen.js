import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState(null);
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
    const { fullName, email, phone, image } = userInfo;
    console.log(userInfo);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.username}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.phoneNumber}>{phone}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
