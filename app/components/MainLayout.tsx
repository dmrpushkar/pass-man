import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Content from "./pages/Content";
import Settings from "./pages/Settings";
import Tabs from "./Tabs";

// Define type for tabs
export type TabType = "content" | "settings";

const MainLayout = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>("content");

  return (
    <View style={styles.container}>
      <Header
        isGroupedView={false}
        onToggleView={() => {
          // You can implement this if needed
          console.log("Toggle view clicked");
        }}
      />

      {activeTab === "content" && <Content />}
      {activeTab === "settings" && <Settings />}

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
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
