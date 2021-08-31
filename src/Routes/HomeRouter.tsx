// import React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../Screens/HomeScreen";
// import { UserType } from "../fbase";

// const Stack = createNativeStackNavigator();

// export default function HomeRouter(props: { user: UserType }) {
//     console.log("in router");
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home">
//                 <Stack.Screen
//                     name="Home"
//                     component={HomeScreen}
//                     // initialParams={{ user: props.user }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function HomeRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeRouter;