import React from 'react';
import { View,Text } from 'react-native';
import { BackgroundCircle, homescreenStyle } from '../../Styles/HomeScreenStyle';


export default function MenuAlarm() {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={[homescreenStyle.containerTopText,homescreenStyle.containerTopTextS]}>알람 시간 변경</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
            </View>
        </View>
    );
}