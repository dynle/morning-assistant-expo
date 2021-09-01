import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import { UserType } from "../fbase";

const Stack = createNativeStackNavigator();

function Setting() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Todo Component</Text>
        </View>
    );
}

export default function HomeRouter(props: { user: UserType }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{presentation:"card",animation:"fade"}}
                // screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    options={{headerShown:false}}
                    name="Home"
                    component={HomeScreen}
                    // initialParams={{ user: props.user }}
                />
                <Stack.Screen name="Todo" component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
