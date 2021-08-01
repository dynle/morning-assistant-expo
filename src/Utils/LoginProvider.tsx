import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbase";
import AuthScreen from "../Screens/AuthScreen";
import HomeScreen from "../Screens/HomeScreen";
import InitSettingScreen from "../Screens/InitSettingScreen";
import checkDBUtil from "./CheckDBUtil";

export default function LoginProvider() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);
    const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

    function handlerIsNewUser(state: boolean) {
        setIsNewUser(state);
    }

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (user) {
            checkDBUtil(user.uid, handlerIsNewUser);
            console.log("Current User Uid: ", user.uid);
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = authService.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return <AuthScreen></AuthScreen>;
    } else {
        return (
            <>{isNewUser ? <InitSettingScreen /> : <HomeScreen />}</>
        );
    }
}
