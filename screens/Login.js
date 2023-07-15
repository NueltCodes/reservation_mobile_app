import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Lottie from "lottie-react-native";
import Toast from "react-native-root-toast";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    if (!email || !password) {
      Toast.show("Please fill all fields", {
        duration: Toast.durations.SHORT,
        position: 100,
        shadow: true,
        animation: true,
      });
      return;
    }
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {loading ? (
            <Lottie
              source={require("../assets/loading2.json")}
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          ) : (
            <>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../assets/login2.png")}
                  style={styles.logoImage}
                />
              </View>
              <View
                style={{
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  backgroundColor: "white",
                  width: "100%",
                  padding: 20,
                }}
              >
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>Sign In</Text>
                  <Text style={styles.reserveText}>Reserve.com</Text>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                      placeholder="Enter your email"
                      placeholderTextColor="black"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.input}
                      />
                      <Pressable onPress={togglePasswordVisibility}>
                        <Feather
                          name={showPassword ? "eye-off" : "eye"}
                          size={24}
                          color="black"
                        />
                      </Pressable>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={onPressResetPassword}
                    style={styles.resetPasswordButton}
                  >
                    <Text style={styles.resetPasswordText}>
                      Forgot password? Reset
                    </Text>
                  </TouchableOpacity>
                </View>
                <Pressable onPress={login} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={styles.signupButton}
                >
                  <Text style={styles.signupButtonText}>
                    Don't have an account? Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003580",
    paddingTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: "100%",
    height: 200,
  },
  logoContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  signInContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  signInText: {
    color: "#003580",
    fontSize: 17,
    fontWeight: "700",
  },
  reserveText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "90%",
    padding: 10,
    backgroundColor: "#f5f6f7",
    borderRadius: 50,
  },
  passwordInputContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center", // Add this line
    // borderBottomColor: "gray",
    // borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },
  resetPasswordButton: {
    marginTop: 0,
    width: 185,
  },
  resetPasswordText: {
    fontSize: 18,
    color: "gray",
  },
  loginButton: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  signupButton: {
    marginVertical: 20,
  },
  signupButtonText: {
    textAlign: "center",
    color: "gray",
    fontSize: 17,
  },
});

export default Login;

// themee #877dfa
