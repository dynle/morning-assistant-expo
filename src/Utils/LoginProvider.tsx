import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import {authService} from '../fbase'
import AuthScreen from '../Screens/AuthScreen';
import {signOutUtil} from './AuthUtil'

export default function LoginProvider(){
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
        // 유저 아이디가 이미 파이어베이스에 있으면 홈페이지, 아니면 처음 설정 화면
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text>Welcome {user!.email}</Text>
            <Button title='Sign Out'onPress={signOutUtil}>Sign Out</Button>
        </View>
    );
}