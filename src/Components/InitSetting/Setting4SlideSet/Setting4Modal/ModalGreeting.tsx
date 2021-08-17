import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Modal,
    Alert,
    TouchableHighlight,
} from "react-native";
import { Button, Divider, Icon } from "react-native-elements";
import { commonStyle } from "../../../../Styles/CommonStyles";
import { modalStyle } from "../../../../Styles/ModalStyle";

export default function ModalGreeting(props: {
    handler: (state: boolean, condition: string) => void;
}) {
    return (
        <View style={[styles.container]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={modalStyle.centeredView}>
                    <View style={modalStyle.modalView}>
                        <View style={modalStyle.modalTop}>
                            <Text style={modalStyle.modalTopText}>인삿말</Text>
                        </View>
                        <View style={modalStyle.modalBottom}>
                            <Text style={modalStyle.modalBottomText}>
                                당신의 밝은 아침을{"\n"}응원하기 위해{"\n"}매일
                                아침 인사를 전합니다.
                            </Text>
                        </View>
                        <Button
                            title="확인"
                            titleStyle={{ color: "black" }}
                            buttonStyle={commonStyle.buttonStyle}
                            style={{ alignItems: "center" }}
                            onPress={() => {
                                props.handler(false, "");
                            }}
                        ></Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#D4C8BB",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
