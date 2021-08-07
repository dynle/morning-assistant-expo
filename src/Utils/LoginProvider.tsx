import React, { useState, useEffect } from "react";
import Loading from "../Components/Common/LoadingComponent";
import { authService, dbService, UserType } from "../fbase";
import AuthScreen from "../Screens/AuthScreen";
import HomeScreen from "../Screens/HomeScreen";
import InitSettingScreen from "../Screens/InitSettingScreen";
import CheckDBUtil from "./CheckDBUtil";

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

    // if (!user) {
    //     return <AuthScreen></AuthScreen>;
    // } else {
    //     // return <Loading></Loading>
    //     if (isNewUser == null) return <Loading></Loading>;
    //     else if (isNewUser == true)
    //         return <InitSettingScreen></InitSettingScreen>;
    //     else return <HomeScreen user={user}></HomeScreen>;
    // }
}
