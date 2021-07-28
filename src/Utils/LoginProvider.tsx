import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {authService} from '../fbase'
import AuthScreen from '../Screens/AuthScreen';
import {signOutUtil} from './AuthUtil'

export default function LoginProvider(){
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState();

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
        <View style={{justifyContent:'center', alignContent:'center',flex:1}}>
            <Text>Welcome</Text>
            <Button title='Sign Out'onPress={signOutUtil}>Sign Out</Button>
        </View>
    );
}