import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddPasswordModal from "./AddPasswordModal";
import { savePassword } from "../utils/passwordStore";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onActionPress?: () => void;
  isGroupedView: boolean;
  onToggleView: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Vault",
  showBackButton = false,
  onBackPress,
  isGroupedView,
  onToggleView,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSavePassword = async (key: string, password: string, category: string) => {
    try {
      await savePassword(key, password, category);
      alert("Password saved!");
      setModalVisible(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

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

      <View style={styles.actions}>
        {/* Toggle View Button */}
        <TouchableOpacity onPress={onToggleView} style={styles.iconButton}>
          <Ionicons
            name={isGroupedView ? "grid-outline" : "list-outline"}
            size={24}
            color="#007AFF"
          />
        </TouchableOpacity>

        {/* Add Password Button */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <AddPasswordModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePassword}
      />
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
});
