import { View as DefaultView, Text, StyleSheet } from 'react-native';
import { View as ThemedView } from '../components/Themed';

export default function HomeScreen() {
  return (
    <DefaultView style={styles.container}>
      <ThemedView style={styles.content}>
        <Text style={styles.title}>Welcome to Password Manager</Text>
      </ThemedView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 