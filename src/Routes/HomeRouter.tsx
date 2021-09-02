import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import { UserType } from "../fbase";
import MenuTodo from "../Components/Home/MenuTodo";
import MenuShare from "../Components/Home/MenuShare";
import MenuAlarm from "../Components/Home/MenuAlarm";
import MenuSlide from "../Components/Home/MenuSlide";
import MenuSetting from "../Components/Home/MenuSetting";

const Stack = createNativeStackNavigator();

export default function HomeRouter(props: { user: UserType }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                // screenOptions={{ presentation: "card", animation: "fade" }}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    // initialParams={{ user: props.user }}
                />
                <Stack.Screen name="Todo" component={MenuTodo} options={{headerBackVisible:true}} />
                <Stack.Screen name="Share" component={MenuShare} />
                <Stack.Screen name="Alarm" component={MenuAlarm} />
                <Stack.Screen name="Slide" component={MenuSlide} />
                <Stack.Screen name="Setting" component={MenuSetting} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
