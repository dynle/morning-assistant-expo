import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting1Name(props: {
    pageMoveHandler: (pageNumber: number) => void;
    scrollEnabledHandler: (enabled: boolean) => void;
}) {
    const [name, setName] = useState("");
    const [hasInput, setHasInput] = useState(false);
    // const [isUniqueUserName, setIsUniqueUserName] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.containerText}>
                    <Text style={{ fontSize: 60, letterSpacing: 2 }}>
                        반갑습니다!{"\n"}
                    </Text>
                    {"\n"}닉네임을{"\n"}알려주세요
                </Text>
            </View>

            <View style={styles.containerMiddle}>
                <TextInput
                    placeholder="이름"
                    placeholderTextColor="#C6BF9F"
                    onChangeText={setName}
                    value={name}
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                {/* <View style={{ minHeight:38 }}>
                    <Text>
                        {name && (
                            <Button
                                title="중복확인"
                                titleStyle={{ color: "red" }}
                                type="outline"
                                buttonStyle={{ borderColor: "red" }}
                                onPress={() => {
                                    // FIXME: DB에서 확인하고 true 값으로 바뀌게 처리
                                    setIsUniqueUserName(true);
                                    console.log("중복 확인 버튼");
                                }}
                            ></Button>
                        )}
                    </Text>
                </View> */}
                <View style={{ flexDirection: "row" }}>
                    {/* TODO: 확인 버튼으로 중복확인까지 할 수 있게 */}
                    <Button
                        title="확인"
                        titleStyle={{ color: "black" }}
                        buttonStyle={{
                            minWidth: "25%",
                            borderRadius: 20,
                            backgroundColor: "#F3EDE1",
                        }}
                        onPress={() => {
                            console.log({ name });
                            if (name) {
                                setHasInput(true);
                                props.scrollEnabledHandler(true);
                                props.pageMoveHandler(1);
                            }
                            // else if (name && !isUniqueUserName) {
                            //     alert("이름 중복 확인을 눌러주세요.");
                            // }
                            else {
                                alert("이름을 입력하세요.");
                            }
                        }}
                    ></Button>
                </View>
            </View>

            <View style={styles.containerBottom}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerMiddle: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerBottom: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "20%",
    },
    containerText: {
        color: "#C6BF9F",
        fontSize: 40,
        // fontWeight: "bold",
        textAlign: "center",
        lineHeight: 60,
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#C6BF9F",
        padding: 10,
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 5,
        color: "#C6BF9F",
        minWidth: "60%",
        textAlign: "center",
        fontSize: 30,
    },
});
