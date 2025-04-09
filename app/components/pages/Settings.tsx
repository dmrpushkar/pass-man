import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { addCategory, getCategories, deleteCategory } from "../../utils/categoryStore";

const Settings = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const storedCategories = await getCategories();
    setCategories(storedCategories);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    await addCategory(categoryName.trim());
    await loadCategories();
    setCategoryName("");
  };

  const handleDeleteCategory = async (category: string) => {
    await deleteCategory(category);
    await loadCategories();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Custom Categories</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={setCategoryName}
        placeholderTextColor="#888"
      />

      <Button title="Add Category" onPress={handleAddCategory} />

      <Text style={styles.subtitle}>Your Categories:</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteCategory(item)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: "#777" }}>No categories yet.</Text>}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 18,
    color: "white",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1E1E3F",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 20,
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  categoryText: {
    color: "white",
    fontSize: 14,
  },
  deleteText: {
    color: "#FF6B6B",
    fontSize: 14,
  },
});
