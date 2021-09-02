import React from 'react';
import { View,Text } from 'react-native';
import { homescreenStyle, BackgroundCircle } from '../../Styles/HomeScreenStyle';


export default function MenuTodo() {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={[homescreenStyle.containerTopText,homescreenStyle.containerTopTextS]}>일정</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
            </View>
        </View>
    );
}