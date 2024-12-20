import React, { useEffect, useState } from "react";
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Dimensions,
} from "react-native";
import { signInUtil, signUpUtil } from "../Utils/AuthUtil";
import GoogleLogin from "../Services/GoogleAuthService";
import { SocialIcon, Input } from "react-native-elements";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default function AuthScren() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createID, setCreateID] = useState(false);

    const signUp = () => {
        signUpUtil(email, password).catch((e) => {
            console.log(e);
            alert(e);
        });
    };
    const signIn = () => {
        signInUtil(email, password).catch((e) => {
            console.log(e);
            alert(e);
        });
    };

    // IDEA: fade in effect 추가
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.title}>오늘의 아침</Text>
            </View>
            <View style={styles.containerBottom}>
                <Input
                    placeholder="example@gmail.com"
                    label="Email"
                    leftIcon={{
                        type: "font-awesome",
                        name: "envelope",
                        color: "#C6BF9F",
                    }}
                    style={{ color: "#C6BF9F" }}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                ></Input>
                <Input
                    textContentType="newPassword"
                    placeholder="Password"
                    label="Password"
                    leftIcon={{
                        type: "font-awesome",
                        name: "lock",
                        color: "#C6BF9F",
                    }}
                    style={{ color: "#C6BF9F" }}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCorrect={false}
                    passwordRules="minlength: 8; required: upper; required: lower;"
                ></Input>
                {/* <TextInput
                    placeholder="Email"
                    placeholderTextColor="#C6BF9F"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#C6BF9F"
                    onChangeText={setPassword}
                    value={password}
                    style={styles.textInput}
                    secureTextEntry={true}
                    passwordRules="required: upper; required: lower; minlength:6"
                /> */}
                {createID ? (
                    <>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                console.log(email, password);
                                signUp();
                            }}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <Text
                            style={styles.text}
                            onPress={() => setCreateID(false)}
                        >
                            Sign In
                        </Text>
                        <SocialIcon
                            title="Sign Up With Google"
                            button
                            type="google"
                            style={{ marginTop: 30 }}
                            onPress={GoogleLogin}
                        ></SocialIcon>
                    </>
                ) : (
                    <>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                console.log(email, password);
                                signIn();
                            }}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </Pressable>
                        <Text
                            style={styles.text}
                            onPress={() => setCreateID(true)}
                        >
                            Create an account
                        </Text>
                        <SocialIcon
                            title="Sign in With Google"
                            button
                            type="google"
                            style={{ marginTop: 30 }}
                            onPress={GoogleLogin}
                        ></SocialIcon>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222323",
        justifyContent: "center",
        padding: "5%",
        width: width,
        height:height
    },
    containerTop: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    containerBottom: {
        flex: 3,
    },
    title: {
        color: "#F2F2F2",
        fontSize: 65,
        fontWeight: "bold",
        textShadowColor: "#E3C65C",
        // textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#C6BF9F",
        padding: 10,
        marginBottom: 30,
        borderRadius: 5,
        color: "#C6BF9F",
    },
    text: {
        color: "#C6BF9F",
        marginTop: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "4%",
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#C6BF9F",
    },
});
