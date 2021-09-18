import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { UserType } from "../../fbase";
import { commonStyle } from "../../Styles/CommonStyles";
import { signOutUtil } from "../../Utils/AuthUtil";
import { CreateDBUtil } from "../../Utils/CreateDBUtil";

export default function Setting6Completion(props: {
    handlerIsNewUser: (state: boolean) => void;
    user: UserType;
}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.containerTopText}>
                    당신의 아침이 {"\n"} 준비 되었습니다
                </Text>
                <Text
                    style={{ fontSize: 20, paddingTop: "20%", lineHeight: 30 }}
                >
                    설정을 변경하고 싶으면{"\n"}스와이프해서 돌아가요!
                </Text>
            </View>
            <View style={styles.containerBottom}>
                {/* TODO: 설정들을 FB에 올리는 버튼 */}
                <Button
                    title="홈 화면으로 가기"
                    titleStyle={{ color: "black" }}
                    buttonStyle={commonStyle.buttonStyle}
                    onPress={async () => {
                        console.log("셋팅 확인");
                        await CreateDBUtil(props.user);
                        props.handlerIsNewUser(false);
                    }}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7E9",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTopText: {
        fontSize: 40,
        textAlign: "center",
        letterSpacing: 2,
        lineHeight: 70,
    },
    containerBottom: {
        flex: 1,
        justifyContent:'flex-end',
        bottom:RFPercentage(25)
    },
});
