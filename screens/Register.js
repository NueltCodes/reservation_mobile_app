import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Image } from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const register = () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert(
        "Incomplete Credentials",
        "Please enter all the credentials",
        [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "OK" },
        ],
        { cancelable: false }
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${uid}`), {
          email: user,
          name: name,
          // phone: phone,
        });
      }
    );
    navigation.navigate("Login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/signup.png")}
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
          <Text style={styles.title}>Register</Text>
          <Text style={styles.reserveText}>Reserve.com</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
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
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
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
            {/* <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              placeholderTextColor="black"
              style={styles.input}
            /> */}
          </View>

          <Pressable onPress={register} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.signInText}
          >
            <Text style={styles.signInLink}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#003580",
    paddingTop: 10,
  },
  logoContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 250,
    height: 250,
  },
  title: {
    color: "#003580",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 15,
    textAlign: "center",
  },
  reserveText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 15,
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
  registerButton: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  signInText: {
    marginVertical: 20,
  },
  signInLink: {
    textAlign: "center",
    color: "gray",
    fontSize: 17,
  },
});
export default Register;
