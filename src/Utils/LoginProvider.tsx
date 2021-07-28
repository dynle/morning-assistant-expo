import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {auth} from '../fbase'
import AuthScreen from '../Screens/AuthScreen';
import {signOutUtil} from './AuthUtil'

export default function LoginProvider(){
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View>
                <AuthScreen></AuthScreen>
            </View>
        );
    }

    return (
        <View style={{justifyContent:'center', alignContent:'center',flex:1}}>
            <Text>Welcome</Text>
            <Button title='Sign Out'onPress={signOutUtil}>Sign Out</Button>
        </View>
    );
}