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

export default function ModalYesterday(props: {
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
                            <Text style={modalStyle.modalTopText}>
                                터인의 어제
                            </Text>
                        </View>
                        <View
                            style={[
                                modalStyle.modalBottom,
                                { alignItems: "center" },
                            ]}
                        >
                            <Text style={modalStyle.modalBottomText}>
                                오늘의 아침에서{"\n"}
                                타인의 어제를{"\n"}
                                만나보세요
                            </Text>
                            <View style={styles.modalBottomBox}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        margin: "7%",
                                        lineHeight: 35,
                                    }}
                                >
                                    오늘 하루의 생각과 찍은 사진을{"\n"}
                                    내일 타인의 영감이 되도록{"\n"}
                                    공유해 보세요.{"\n"}
                                    하루하루 무작위로 선정됩니다.{"\n"}
                                    좋아요 버튼으로 감사의 표시를{"\n"}
                                    표현하세요!
                                </Text>
                            </View>
                        </View>

                        <Button
                            title="확인"
                            titleStyle={{ color: "black" }}
                            buttonStyle={modalStyle.modalButton}
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
    containerTitle: {
        flex: 1,
    },
    containerRemainer: {
        flex: 3.5,
        width: Dimensions.get("window").width,
    },
    containerTop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    containerTopText: {
        fontSize: 30,
    },
    containerMiddle: {
        flex: 2,
        justifyContent: "center",
    },
    containerBottom: {
        flex: 1,
        width: Dimensions.get("window").width,
        maxWidth: "80%",
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
    modalBottomBox: {
        backgroundColor: "#D4CEC2",
        minHeight: "45%",
        minWidth: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        marginTop:"7%"
    },
});
