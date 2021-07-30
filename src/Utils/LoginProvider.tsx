import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { authService } from "../fbase";
import AuthScreen from "../Screens/AuthScreen";
import InitSettingScreen from "../Screens/InitSettingScreen";

export default function LoginProvider() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = authService.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <AuthScreen></AuthScreen>
        );
    }

    return (
        // 로그인 되어 있으면 기본 화면
        // 아래 컴포넌트에서 판단하니까 handler 이용해서 위로 끌고와?
        <View>
            {/* 첫 로그인이면, firebase에 DB가 없다면 */}
            <InitSettingScreen />

            {/* 첫 로그인이 아니면, firebase DB가 있다면 */}
        </View>
    );
}
