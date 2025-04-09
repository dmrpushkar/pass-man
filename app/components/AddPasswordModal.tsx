import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { getCategories } from "@/app/utils/categoryStore";

interface AddPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (key: string, password: string, category: string) => void;
}

const AddPasswordModal: React.FC<AddPasswordModalProps> = ({ visible, onClose, onSave }) => {
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };

    if (visible) {
      fetchCategories();
    }
  }, [visible]);

  const handleSave = () => {
    if (!key || !password) {
      alert("Please fill all fields");
      return;
    }
    onSave(key, password, category);
    setKey("");
    setPassword("");
    setCategory("");

  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Key (e.g., Gmail)"
            placeholderTextColor="#888"
            value={key}
            onChangeText={setKey}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {categories.length > 0 && (<>
              <Text style={styles.label}>Category</Text>
              <View style={styles.dropdown}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryOption,
                      category === cat && { backgroundColor: "#007AFF" },
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === cat && { color: "white" },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>)
          }

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1E1E3F",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: "white",
  },
  label: {
    color: "white",
    marginBottom: 8,
  },
  dropdown: {
    marginBottom: 16,
  },
  categoryOption: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#333",
    marginBottom: 8,
  },
  categoryText: {
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
