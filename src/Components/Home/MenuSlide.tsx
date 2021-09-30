import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { UserType } from "../../fbase";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";
import DragAndDrop from "../InitSetting/Setting4SlideSet/DragAndDrop";
import ModalAlarm from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalAlarm";
import ModalNews from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalNews";
import ModalTime from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalTime";
import ModalTodo from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalTodo";
import ModalWeather from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalWeather";
import ModalYesterday from "../InitSetting/Setting4SlideSet/Setting4Modal/ModalYesterday";

export default function MenuSlide(props: { user: UserType, navigation: any }) {
    const [infoModalVisible, setInfoModalVisible] = useState([false, ""]);

    const modalHandler = (state: boolean, condition: string) => {
        setInfoModalVisible([state, condition]);
    };

    const renderSwitch = (param: boolean | string) => {
        switch (param) {
            case "알람":
                return <ModalAlarm handler={modalHandler} />;
            case "시간":
                return <ModalTime handler={modalHandler} />;
            case "일정":
                return <ModalTodo handler={modalHandler} />;
            case "날씨":
                return <ModalWeather handler={modalHandler} />;
            case "뉴스":
                return <ModalNews handler={modalHandler} />;
            case "타인의 어제":
                return <ModalYesterday handler={modalHandler} />;
        }
    };
    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle />

            {infoModalVisible[0] && renderSwitch(infoModalVisible[1])}

            <View style={homescreenStyle.containerTop}>
                <Text
                    style={[
                        homescreenStyle.containerTopText,
                        homescreenStyle.containerTopTextS,
                    ]}
                >
                    슬라이드 변경
                </Text>
            </View>
            <View style={[homescreenStyle.containerBottom,{marginTop:-RFPercentage(5)}]}>
                <View
                    style={{ flex: 5, width: Dimensions.get("window").width }}
                >
                    <DragAndDrop modalHandler={modalHandler} />
                </View>
                <View style={homescreenStyle.containerBottomButton}>
                    <Button
                        title="저장"
                        titleStyle={{ color: "black" }}
                        buttonStyle={commonStyle.buttonStyle}
                        onPress={() => props.navigation.goBack()}
                    ></Button>
                </View>
            </View>
        </View>
    );
}
