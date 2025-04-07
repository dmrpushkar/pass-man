import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tabs = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="lock-closed-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopColor: "#1E1E3F",
    borderTopWidth: 1,
    backgroundColor: "#0A0A23",
  },
});