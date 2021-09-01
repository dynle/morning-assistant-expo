import React, { useState, useEffect } from "react";
import Loading from "../Components/Common/LoadingComponent";
import { authService, dbService, UserType } from "../fbase";
import HomeRouter from "../Routes/HomeRouter";
import AuthScreen from "../Screens/AuthScreen";
import InitSettingScreen from "../Screens/InitSettingScreen";
import CheckDBUtil from "./CheckDBUtil";
import { View } from "react-native";

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

    // return <InitSettingScreen></InitSettingScreen>
    // return <HomeScreen></HomeScreen>

    if (!user) {
        return <AuthScreen></AuthScreen>;
    } else {
        if (isNewUser == null) return <Loading></Loading>;
        else if (isNewUser == true)
            return (
                <View style={{ alignItems: "center" }}>
                    <InitSettingScreen
                        handlerIsNewUser={handlerIsNewUser}
                        user={user}
                    />
                </View>
            );
        else return <HomeRouter user={user} />;
    }
}
