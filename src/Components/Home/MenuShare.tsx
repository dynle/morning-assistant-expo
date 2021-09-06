import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    TextInput,
    Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";
import moment from "moment";
import "moment/locale/ko";
import Letter from "../../../assets/homescreen/Letter.png";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";

const clock_height = RFPercentage(20);
const clock_width = RFPercentage(20);

export default function MenuShare(props: { navigation: any }) {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");

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
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);
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
                    타인의 어제
                </Text>
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
                    <View>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 100, height: 100 }}
                            />
                        )}
                    </View>
                    <Button
                        icon={{
                            name: "add",
                            size: RFPercentage(3),
                            color: "white",
                        }}
                        title="사진 업로드 하기"
                        onPress={pickImage}
                        buttonStyle={{ backgroundColor: "#535351" }}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setText}
                        value={text}
                        maxLength={80}
                        multiline
                        placeholder="오늘 하루에 대해서 이야기 해 보세요."
                        placeholderTextColor="#858583"
                        autoCorrect={false}
                        textAlignVertical={"center"}
                    ></TextInput>
                    <Button title="보내기"></Button>
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
        fontSize: RFPercentage(4),
        marginTop: "5%",
    },
    dateStyle: {
        textAlign: "center",
        color: "#DFCA96",
        fontSize: RFPercentage(2),
        marginTop: "3%",
    },
    textInput: {
        height: "50%",
        width: Dimensions.get("window").width * 0.9,
        color: "white",
        borderRadius: RFPercentage(2),
        fontSize: RFPercentage(3),
        backgroundColor: "#535351",
        textAlign: "center",
        padding: RFPercentage(3),
        lineHeight: RFPercentage(4),
        marginTop: "2%",
        // paddingTop:0,
        // paddingBottom:0
    },
});
