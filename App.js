import { StyleSheet } from "react-native";
import StackNavigation from "./StackNavigation";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation />
        <ModalPortal />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
