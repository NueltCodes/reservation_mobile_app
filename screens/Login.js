import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader2 from "../assets/loading2.json";
import Lottie from "lottie-react-native";
import Toast from "react-native-root-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user details", user);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          let errorMessage = "";

          // Check for specific error codes and set the custom error message accordingly
          switch (errorCode) {
            case "auth/invalid-email":
              errorMessage = "Invalid email address";
              break;
            case "auth/wrong-password":
              errorMessage = "Incorrect password";
              break;
            // Add more cases for other error codes as needed
            case "auth/too-many-requests":
              errorMessage =
                "Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.";
              break;
            default:
              errorMessage =
                "An error occurred, fill in all require details, make sure its correct.";
              break;
          }

          // Display the error message as a toast notification
          Toast.show(errorMessage, {
            duration: 5500,
            position: 100,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
    }
  };
  const onPressResetPassword = () => {
    if (!email) {
      Toast.show("Email is required", {
        duration: Toast.durations.SHORT,
        position: 100,
        shadow: true,
        animation: true,
      });
      return;
    }

    resetPassword(email);
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        Toast.show("Password reset email sent, check your email", {
          duration: Toast.durations.SHORT,
          position: 100,
          shadow: true,
          animation: true,
        });
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code:", errorCode);
        console.log("Error message:", errorMessage);
        Toast.show("Error sending password reset email", {
          duration: Toast.durations.SHORT,
          position: 100,
          shadow: true,
          animation: true,
        });
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.replace("Main");
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: loading ? "center" : undefined,
        alignItems: loading ? "center" : undefined,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      {loading ? (
        <Lottie
          source={Loader2}
          autoPlay
          loop
          style={{ width: "100%", height: 200 }}
        />
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
              Sign In
            </Text>

            <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
              Sign In to Your Account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="enter your email id"
                placeholderTextColor={"black"}
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Password
              </Text>

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={"black"}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
              />
            </View>

            <Pressable
              onPress={onPressResetPassword}
              style={{
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "gray" }}>
                Forgot password? reset
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={login}
            style={{
              width: 200,
              backgroundColor: "#003580",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 20 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
