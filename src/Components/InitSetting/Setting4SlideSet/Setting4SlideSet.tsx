import React, { useState } from "react";
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
import { signOutUtil } from "../../../Utils/AuthUtil";
import DragAndDrop from "./DragAndDrop";
import ModalAlarm from "./Setting4Modal/ModalAlarm";
import ModalGreeting from "./Setting4Modal/ModalGreeting";
import ModalNews from "./Setting4Modal/ModalNews";
import ModalTime from "./Setting4Modal/ModalTime";
import ModalWeather from "./Setting4Modal/ModalWeather";
import ModalYesterday from "./Setting4Modal/ModalYesterday";

export default function Setting4SlideSet(props: {
    pageMoveHandler: (pageNumber: number) => void;
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState([false, ""]);

    function modalHandler(state: boolean, condition: string) {
        setInfoModalVisible([state, condition]);
    }

    function renderSwitch(param: boolean | string) {
        switch (param) {
            case "알람":
                return <ModalAlarm handler={modalHandler} />;
            case "시간":
                return <ModalTime handler={modalHandler} />;
            case "인삿말":
                return <ModalGreeting handler={modalHandler} />;
            case "날씨":
                return <ModalWeather handler={modalHandler} />;
            case "뉴스":
                return <ModalNews handler={modalHandler} />;
            case "타인의 어제":
                return <ModalYesterday handler={modalHandler} />;
        }
    }

    return (
        <View
            style={[
                styles.container,
                modalVisible && { backgroundColor: "#716F6F" },
            ]}
        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ marginBottom: 15, textAlign: "center" }}>
                            아침 슬라이드의 설명
                        </Text>

                        <TouchableHighlight
                            style={{
                                ...styles.openButton,
                                backgroundColor: "#2196F3",
                            }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Icon type="material-community" name="close"></Icon>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            {/* Modal 설명창 띄우기 */}
            {infoModalVisible[0] && renderSwitch(infoModalVisible[1])}

            <View style={styles.containerTop}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.containerTopText}>슬라이드</Text>
                    <Icon
                        type="font-awesome-5"
                        name="question-circle"
                        color="#EC407A"
                        style={{ marginLeft: 10 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    ></Icon>
                </View>
                <Text style={{ marginTop:'2%' ,fontSize: 15 }}>
                    *클릭 시 추가 설명과 설정 창을 확인 할 수 있어요!
                </Text>
            </View>
            <View style={styles.containerRemainer}>
                <DragAndDrop
                    handler={modalHandler}
                    pageMoveHandler={props.pageMoveHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#93969C",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerRemainer: {
        flex: 6,
        width: Dimensions.get("window").width,
    },
    containerTop: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
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
