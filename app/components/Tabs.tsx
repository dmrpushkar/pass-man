import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TabType } from "./MainLayout";

type TabsProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const isActive = (tab: TabType) => activeTab === tab;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActiveTab("content")} style={styles.tabButton}>
        <Feather name="home" size={24} color={isActive("content") ? "white" : "#888"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("settings")} style={styles.tabButton}>
        <Ionicons name="settings-outline" size={24} color={isActive("settings") ? "white" : "#888"} />
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1C1C2E",
    paddingVertical: 10,
  },
  tabButton: {
    padding: 10,
  },
});
