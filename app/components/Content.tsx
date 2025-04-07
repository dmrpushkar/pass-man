import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";

const mockData = [
  { id: uuidv4(), title: "Kite Profile Creds", username: "rahul", password: "pass123", category: "Finance" },
  { id: uuidv4(), title: "Netflix Account", username: "rahul.netflix", password: "pass456", category: "Entertainment" },
  { id: uuidv4(), title: "Google Account", username: "rahul@gmail.com", password: "pass789", category: "Personal" },
];

const groupedByCategory = mockData.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof mockData>);

const Content = () => {
  return (
    <FlatList
      style={styles.container}
      data={Object.keys(groupedByCategory)}
      keyExtractor={(item) => item}
      renderItem={({ item: category }) => (
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {groupedByCategory[category].map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryUsername}>{entry.username}</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 8,
  },
  entryCard: {
    backgroundColor: "#1E1E3F",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  entryTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  entryUsername: {
    color: "#B0B0B0",
    fontSize: 14,
  },
});
