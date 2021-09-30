import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";
import moment from "moment";
import "moment/locale/ko";
import Letter from "../../../assets/homescreen/Letter.png";
import Camera from '../../../assets/homescreen/Camera.png';
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import { modalStyle } from "../../Styles/ModalStyle";
import { UserType } from "../../fbase";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const clock_height = RFPercentage(16);
const clock_width = RFPercentage(16);

export default function MenuShare(props: { user:UserType, navigation: any }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    // first check whether one sends letter and then put initial boolean value
    const [IsButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                console.log(status);
                if (status !== "granted") {
                    alert("사진 업로드를 위해서는 권한이 필요합니다.");
                }
            }
        })();
    }, []);
    return (
        <KeyboardAvoidingView
            style={homescreenStyle.container}
            behavior="padding"
            enabled
        >
            <BackgroundCircle />

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
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
                                        fontSize: RFPercentage(3),
                                        margin: RFPercentage(3),
                                        lineHeight: RFPercentage(5),
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
                                setModalVisible(!modalVisible);
                            }}
                        ></Button>
                    </View>
                </View>
            </Modal>

            <View style={homescreenStyle.containerTop}>
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={[
                            homescreenStyle.containerTopText,
                            homescreenStyle.containerTopTextS,
                        ]}
                    >
                        타인의 어제
                    </Text>
                    <Icon
                        type="font-awesome-5"
                        name="question-circle"
                        color="#EC407A"
                        containerStyle={styles.iconContainer}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <View style={homescreenStyle.containerBottomFig}>
                    <View style={styles.containerFig}>
                        <Image
                            source={Letter}
                            style={styles.imageStyle}
                        ></Image>
                    </View>
                    <Text style={styles.dayOfWeekStyle}>
                        {moment().add(1, "days").format("dddd")}
                    </Text>
                    <Text style={styles.dateStyle}>
                        {moment().add(1, "days").format("LL")}
                    </Text>
                </View>
                <View
                    style={[
                        homescreenStyle.containerBottomMid,
                        {
                            justifyContent: "center",
                            flexDirection: "column",
                        },
                    ]}
                >
                    <View style={styles.picNletterContainer}>
                        <View style={styles.picContainer}>
                            {image ? (
                                <View>
                                    <Image
                                        source={{ uri: image }}
                                        style={{
                                            width: width * 0.5,
                                            height: height * 0.2,
                                        }}
                                    />
                                    <Button
                                        icon={{
                                            name: "remove",
                                            size: 20,
                                            color: "black",
                                        }}
                                        onPress={() => setImage(null)}
                                        iconContainerStyle={styles.removeIconContainer}
                                        buttonStyle={styles.removeButtonStyle}
                                        containerStyle={
                                            styles.removeButtonContainer
                                        }
                                    />
                                </View>
                            ) : (
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        source={Camera}
                                    >
                                    </Image>
                                    <Text style={styles.uploadButtonText}>
                                        사진 업로드 하기
                                    </Text>
                                    <Button
                                        icon={{
                                            name: "add",
                                            size: RFPercentage(2.5),
                                            color: "black",
                                        }}
                                        iconContainerStyle={styles.CameraIconContainer}
                                        onPress={pickImage}
                                        buttonStyle={styles.CameraButtonContainer}
                                        containerStyle={styles.CameraContainer}
                                    />
                                </View>
                            )}
                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setText}
                            value={text}
                            maxLength={80}
                            multiline
                            placeholder="오늘 하루를 간단하게 말해보세요!"
                            placeholderTextColor="#B7B7B7"
                            autoCorrect={false}
                            textAlignVertical={"center"}
                        />
                        <Button
                            title="보내기"
                            titleStyle={{ color: "black",fontSize:RFPercentage(2.5) }}
                            disabled={IsButtonDisabled}
                            buttonStyle={[commonStyle.buttonStyle,{minWidth:RFPercentage(13),height:RFPercentage(4.5)}]}
                            disabledStyle={[
                                commonStyle.buttonStyle,
                                { opacity: 0.3 },
                            ]}
                            onPress={() => {
                                if (text) {
                                    console.log("sent");
                                    setIsButtonDisabled(true);
                                } else {
                                    Alert.alert("텍스트를 입력하세요.");
                                }
                            }}
                        />
                    </View>
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerFig: {
        height: clock_height,
        width: clock_width,
        borderRadius: clock_height / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFEEC0",
        shadowColor: "#E3BF7C",
        shadowOpacity: 10,
        shadowRadius: 15,
    },
    imageStyle: {
        width: "70%",
        height: "50%",
        opacity: 0.5,
    },
    dayOfWeekStyle: {
        textAlign: "center",
        color: "#DFCA96",
        fontSize: RFPercentage(3.5),
        marginTop: "5%",
    },
    dateStyle: {
        textAlign: "center",
        color: "#DFCA96",
        fontSize: RFPercentage(2),
        marginTop: "3%",
    },
    textInput: {
        height: height * 0.12,
        width: width * 0.8,
        color: "white",
        borderRadius: RFPercentage(2),
        fontSize: RFPercentage(3),
        backgroundColor: "#747473",
        textAlign: "center",
        padding: RFPercentage(3),
        lineHeight: RFPercentage(4),
        marginTop: "2%",
        // paddingTop:0,
        // paddingBottom:0
    },
    iconContainer: {
        height: 25,
        width: 25,
        position: "absolute",
        right: "-20%",
    },
    modalBottomBox: {
        backgroundColor: "#D4CEC2",
        minHeight: "45%",
        minWidth: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        marginTop: RFPercentage(2),
    },
    picNletterContainer: {
        backgroundColor: "#535351",
        width: width * 0.9,
        height: height * 0.4,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius:RFPercentage(2)
    },
    picContainer: {
        backgroundColor: "#747473",
        width: width * 0.5,
        height: height * 0.2,
        marginTop: "2%",
        justifyContent: "center",
        alignItems: "center",
    },
    removeIconContainer:{
        width:25,
        height:25,
        justifyContent:'center',
        alignItems:'center'
    },
    removeButtonStyle: {
        backgroundColor: "#F2EDE1",
        borderRadius: RFPercentage(10),
        width: 25,
        height: 25,
        // padding: 0,
    },
    removeButtonContainer: {
        position: "absolute",
        right: -RFPercentage(1),
        top: -RFPercentage(1),
    },
    uploadButtonText: {
        color: "#B7B7B7",
        marginBottom: RFPercentage(3),
    },
    CameraIconContainer:{
        width:20,
        height:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RFPercentage(2)
    },
    CameraButtonContainer:{
        backgroundColor: "#F2EDE1",
        borderRadius: RFPercentage(2),
        width:10,
        height:10,
    },
    CameraContainer:{
        width: RFPercentage(8),
        position:'absolute',
        alignItems:'center',
        top:'20%',
    }
});
