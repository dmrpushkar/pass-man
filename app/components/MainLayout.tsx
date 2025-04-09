import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Content from "./Content";
import Tabs from "./Tabs";

const MainLayout = () => {
  const [isGroupedView, setIsGroupedView] = React.useState(true);

  return (
    <View style={styles.container}>
      <Header isGroupedView={false} onToggleView={function (): void {
        throw new Error("Function not implemented.");
      } }/>
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
