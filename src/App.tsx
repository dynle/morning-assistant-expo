import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {auth} from './Utils/fbase'

export default function App() {
  const login = () => {
    auth.createUserWithEmailAndPassword("hi@gmail.com",'123456').then(()=>{
      console.log('account signed up') //working fine!!!!
    })
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="account" onPress={login}>create account</Button>
      <StatusBar style="auto" />
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