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
                >
                    {_props=> <HomeScreen {..._props} user={props.user}/>}
                </Stack.Screen>
                <Stack.Screen name="Todo" options={{headerBackVisible:true}}>
                    {_props=> <MenuTodo {..._props} user={props.user}/>}
                </Stack.Screen>
                <Stack.Screen name="Share">
                    {_props=> <MenuShare {..._props} user={props.user}/>}
                </Stack.Screen>
                <Stack.Screen name="Alarm">
                    {_props=> <MenuAlarm {..._props} user={props.user}/>}
                </Stack.Screen>
                <Stack.Screen name="Slide">
                    {_props=> <MenuSlide {..._props} user={props.user}/>}
                </Stack.Screen>
                <Stack.Screen name="Setting">
                    {_props=> <MenuSetting {..._props} user={props.user}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
