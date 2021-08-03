import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting1Name() {
    const [name, setName] = useState("");
    const [hasInput, setHasInput] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.containerText}>
                    이름을{"\n"}입력해 주세요
                </Text>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#C6BF9F"
                    onChangeText={setName}
                    value={name}
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                <View style={{ flex: 0.15, justifyContent: "flex-start" }}>
                    <Text>
                        {name && (
                            <Button
                                title="중복확인"
                                type="outline"
                                // TODO: 중복확인버튼에서 return값이 true면 완료를 누를 수 있게, 아니면 alert
                                onPress={() => console.log("중복 확인 버튼")}
                            ></Button>
                        )}
                    </Text>
                </View>
                {/* TODO: 완료 누르면 자동으로 옆으로 넘어가게 */}
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="완료"
                        // type="outline"
                        onPress={() => {
                            console.log({ name });
                            if (name) {
                                setHasInput(true);
                            } else {
                                alert("이름을 입력하세요");
                            }
                        }}
                    ></Button>
                    <Button
                        title="삭제"
                        // type="outline"
                        onPress={() => {
                            setName("");
                            setHasInput(false);
                        }}
                    ></Button>
                </View>
            </View>

            <View style={styles.containerBottom}>
                {hasInput && (
                    <Icon
                        type="material-community"
                        name="gesture-swipe-left"
                        size={100}
                        color="#C6BF9F"
                        style={{}}
                    ></Icon>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222323",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 2,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerBottom: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 100,
    },
    containerText: {
        color: "#C6BF9F",
        fontSize: 40,
        // fontWeight: "bold",
        textAlign: "center",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#C6BF9F",
        padding: 10,
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 5,
        color: "#C6BF9F",
        minWidth: "60%",
    },
});
