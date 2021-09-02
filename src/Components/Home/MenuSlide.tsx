import React from 'react';
import { View,Text } from 'react-native';
import { BackgroundCircle, homescreenStyle } from '../../Styles/HomeScreenStyle';


export default function MenuSlide() {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={[homescreenStyle.containerTopText,homescreenStyle.containerTopTextS]}>슬라이드 변경</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
            </View>
        </View>
    );
}