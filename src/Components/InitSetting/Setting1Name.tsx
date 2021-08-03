import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting1Name() {
    const [name, setName] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>이름을{"\n"}입력해 주세요</Text>
            <TextInput
                placeholder="Name"
                placeholderTextColor="#C6BF9F"
                onChangeText={setName}
                value={name}
                style={styles.textInput}
                autoCapitalize="none"
            />
            {/* TODO: 완료 누르면 자동으로 옆으로 넘어가게 */}
            <Button title="완료" type="outline" onPress={()=>console.log({name})}></Button>
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
