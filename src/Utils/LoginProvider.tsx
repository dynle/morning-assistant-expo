import React, { useState, useEffect } from "react";
import Loading from "../Components/Common/LoadingComponent";
import { authService, dbService, UserType } from "../fbase";
import HomeRouter from "../Routes/HomeRouter";
import AuthScreen from "../Screens/AuthScreen";
import HomeScreen from "../Screens/HomeScreen";
import InitSettingScreen from "../Screens/InitSettingScreen";
import CheckDBUtil from "./CheckDBUtil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginProvider() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<UserType | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
    console.log("isNewUser? ", isNewUser);

    function handlerIsNewUser(state: boolean) {
        setIsNewUser(state);
    }

    // Handle user state changes
    function onAuthStateChanged(user: UserType | null) {
        setIsNewUser(null);
        setUser(user);
        if (user) {
            CheckDBUtil(user, handlerIsNewUser);
            console.log("Current User Uid: ", user.uid);
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = authService.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return <InitSettingScreen></InitSettingScreen>
    // return <HomeScreen></HomeScreen>

    // if (!user) {
    //     return <AuthScreen></AuthScreen>;
    // } else {
    //     // return <Loading></Loading>
    //     if (isNewUser == null) return <Loading></Loading>;
    //     else if (isNewUser == true)
    //         return <InitSettingScreen></InitSettingScreen>;
    //     else return <HomeScreen user={user}></HomeScreen>;
    //     // else return <HomeRouter user={user}></HomeRouter>;
    // }

    // TODO: router를 써서 
    // const Stack=createNativeStackNavigator();
    // if (!user) {
    //     return <AuthScreen></AuthScreen>;
    // } else {
    //     if (isNewUser == null) return <Loading></Loading>;
    //     else if (isNewUser == true)
    //         return <InitSettingScreen></InitSettingScreen>;
    //     else return(
    //         <NavigationContainer>
    //             <Stack.Navigator initialRouteName="Home">
    //                 <Stack.Screen name="Home" component={HomeScreen}/>
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     ) ;
    // }


    // const Stack = createNativeStackNavigator();
    // return (
    //     <NavigationContainer>
    //         {!user ? (
    //             <AuthScreen></AuthScreen>
    //         ) : (isNewUser==null ? (
    //             <Loading></Loading>
    //         ) : (
    //             <Stack.Navigator>
    //                 {isNewUser ? (
    //                     <Stack.Screen
    //                         name="InitSettingScreen"
    //                         component={InitSettingScreen}
    //                     />
    //                 ) : (
    //                     <Stack.Screen name="Home" component={HomeScreen} />
    //                 )}
    //             </Stack.Navigator>
    //         ))}
    //     </NavigationContainer>
    // );
}
