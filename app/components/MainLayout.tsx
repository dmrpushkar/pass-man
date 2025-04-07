import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Content from "./Content";
import Tabs from "./Tabs";

const MainLayout = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Content />
      <Tabs />
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A23",
  },
});
