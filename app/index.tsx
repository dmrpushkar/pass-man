import React, { useEffect, useState, useRef } from 'react';
import { Animated, View as DefaultView, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import { View as ThemedView } from './components/Themed';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';
import MainLayout from '@/app/components/MainLayout';

const isDevelopment = __DEV__ || Constants.expoConfig?.extra?.disableAuth === true;

export default function HomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [encryptionKey, setEncryptionKey] = useState<Uint8Array | null>(null);

  const handleAuthentication = async () => {
    if (isDevelopment) {
      console.log('Skipping authentication for development.');
      setAuthenticated(true);
      return;
    }
    try {
      const isEnrolled = await LocalAuthentication.hasHardwareAsync();
      if (!isEnrolled) {
        Alert.alert('Authentication not supported', 'Your device does not support biometric authentication.');
        return;
      }

      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access PassMan',
        fallbackLabel: 'Use Passcode',
      });

      if (authResult.success) {
        setAuthenticated(true);
      } else {
        Alert.alert('Authentication failed', 'Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowWelcome(false);
        handleAuthentication
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  if (showWelcome) {
    return (
      <DefaultView style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Image source={require('../app/assets/images/PassMan.png')} style={styles.logo} />
        </Animated.View>
      </DefaultView>
    );
  }

  if (!authenticated) {
    return (
      <DefaultView style={styles.container}>
        <ThemedView style={styles.content}>
          <Text style={styles.text}>Authentication required</Text>
          <Button title="Authenticate" onPress={handleAuthentication} />
        </ThemedView>
      </DefaultView>
    );
  }

  return (
    <DefaultView style={styles.container}>
      <MainLayout />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(31 37 69)',
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
  logo: {
    width: "100%",
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
});
