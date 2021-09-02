import React from 'react';
import { View,Text } from 'react-native';
import { BackgroundCircle, homescreenStyle } from '../../Styles/HomeScreenStyle';


export default function MenuShare() {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={[homescreenStyle.containerTopText,homescreenStyle.containerTopTextS]}>타인의 어제 공유</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
            </View>
        </View>
    );
}