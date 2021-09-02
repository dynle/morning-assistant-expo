import React from 'react';
import { View,Text } from 'react-native';
import { Button } from 'react-native-elements';
import { BackgroundCircle, homescreenStyle } from '../../Styles/HomeScreenStyle';
import { signOutUtil } from '../../Utils/AuthUtil';


export default function MenuSetting(props:{navigation:any}) {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={[homescreenStyle.containerTopText,homescreenStyle.containerTopTextS]}>설정</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
            <Button title="로그아웃" onPress={signOutUtil}></Button>
            <Button title="뒤로가기" onPress={()=>props.navigation.goBack()}></Button>
            </View>
        </View>
    );
}