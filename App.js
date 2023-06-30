import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./StackNavigation";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <>
      <StackNavigation />
      <ModalPortal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
