import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Modal,
    Alert,
    TouchableHighlight,
    Switch,
} from "react-native";
import { Button, Divider, Icon } from "react-native-elements";
import { modalStyle } from "../../../../Styles/ModalStyle";
import { commonStyle } from "../../../../Styles/CommonStyles";

export default function ModalAlarm(props: {
    handler: (state: boolean, condition: string) => void;
}) {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
                            <Text style={modalStyle.modalTopText}>알람</Text>
                        </View>
                        <View style={modalStyle.modalBottom}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 30 }}>
                                    뮤직 스트리밍 앱 연동
                                </Text>
                                <Text style={{ fontSize: 20 }}>
                                    좋아하는 음악으로 설정
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={modalStyle.modalBottomText}
                                        >
                                            알람 커스터마이즈
                                        </Text>
                                        <View style={{ marginLeft: "auto" }}>
                                            <Switch
                                                style={{ marginRight: "5%" }}
                                                trackColor={{
                                                    false: "#767577",
                                                    true: "#5AA7AA",
                                                }}
                                                thumbColor={
                                                    isEnabled
                                                        ? "#f4f3f4"
                                                        : "#f4f3f4"
                                                }
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20 }}>
                                        부드럽게 음악 시작
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={modalStyle.modalBottomText}
                                        >
                                            음악 정보 표시
                                        </Text>
                                        <View style={{ marginLeft: "auto" }}>
                                            <Switch
                                                style={{ marginRight: "5%" }}
                                                trackColor={{
                                                    false: "#767577",
                                                    true: "#5AA7AA",
                                                }}
                                                thumbColor={
                                                    isEnabled
                                                        ? "#f4f3f4"
                                                        : "#f4f3f4"
                                                }
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
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
