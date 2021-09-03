import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";

export default function MenuShare(props: { navigation: any }) {
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle />
            <View style={homescreenStyle.containerTop}>
                <Text
                    style={[
                        homescreenStyle.containerTopText,
                        homescreenStyle.containerTopTextS,
                    ]}
                >
                    타인의 어제 공유
                </Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <View style={homescreenStyle.containerBottomFig}></View>
                <View style={homescreenStyle.containerBottomMid}></View>
                <View style={homescreenStyle.containerBottomButton}>
                    <Button
                        title="확인"
                        titleStyle={{ color: "black" }}
                        buttonStyle={commonStyle.buttonStyle}
                        onPress={() => props.navigation.goBack()}
                    ></Button>
                </View>
            </View>
        </View>
    );
}
