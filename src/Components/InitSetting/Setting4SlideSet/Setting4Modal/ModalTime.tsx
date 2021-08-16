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

export default function ModalTime(props: {
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={modalStyle.modalTop}>
                            <Text style={modalStyle.modalTopText}>시간</Text>
                        </View>
                        <View style={modalStyle.modalBottom}>
                            <Text style={modalStyle.modalBottomText}>
                                현재 시각을{"\n"}표시해 줍니다.
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        height: "90%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
