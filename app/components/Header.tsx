import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onActionPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Vault",
  showBackButton = false,
  onBackPress,
  onActionPress,
}) => {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} /> // Placeholder for alignment
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onActionPress}>
        <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#1E1E3F",
    borderBottomWidth: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
