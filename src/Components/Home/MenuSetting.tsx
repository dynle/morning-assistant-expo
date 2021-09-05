import React from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";
import { signOutUtil } from "../../Utils/AuthUtil";

function MenuStyle(menuName: string, func?: () => void) {
    return (
        <TouchableOpacity
            onPress={func}
            activeOpacity={0.5}
            style={[styles.buttonStyle]}
        >
            <Text style={{ color: "white", fontSize: RFPercentage(2.5) }}>
                {menuName}
            </Text>
        </TouchableOpacity>
    );
}

export default function MenuSetting(props: { navigation: any }) {
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
                    설정
                </Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <View style={homescreenStyle.containerBottomFig}>
                    <Text
                        style={{ color: "#C6BF9F", fontSize: RFPercentage(4) }}
                    >
                        커스텀 알림
                    </Text>
                    {MenuStyle("로컬 파일 불러오기")}
                    {MenuStyle("스포티파이 연동하기")}
                </View>
                <View style={homescreenStyle.containerBottomMid}>
                    <Text
                        style={{ color: "#C6BF9F", fontSize: RFPercentage(4) }}
                    >
                        계정 관리
                    </Text>
                    {MenuStyle("이름 변경")}
                    {MenuStyle("로그아웃", signOutUtil)}
                    {MenuStyle("계정 삭제")}
                </View>
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

const styles = StyleSheet.create({
    buttonStyle: {
        width: "170%",
        minHeight: "9%",
        borderRadius: RFPercentage(3),
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C6BF9F",
        borderWidth: RFPercentage(0.3),
        marginTop: "10%",
    },
});
