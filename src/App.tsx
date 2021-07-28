import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {auth} from './fbase'
import LoginProvider from './Utils/LoginProvider';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LoginProvider></LoginProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});