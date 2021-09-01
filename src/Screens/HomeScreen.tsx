import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { UserType } from "../fbase";

const menu = [
    {
        key: "1",
        color: "#2C838B",
        image: "",
        title: "일정 추가",
        navigate: "",
    },
    {
        key: "2",
        color: "#74ADAE",
        image: "",
        title: "타인의 어제 공유",
        navigate: "",
    },
    {
        key: "3",
        color: "#F5BCA2",
        image: "",
        title: "알람 시간 변경",
        navigate: "",
    },
    {
        key: "4",
        color: "#F19569",
        image: "",
        title: "슬라이드 변경",
        navigate: "",
    },
    {
        key: "5",
        color: "#ED8049",
        image: "",
        title: "설정",
        navigate: "",
    },
];

// delete props: { user: UserType } for test
export default function HomeScreen(props: { user: UserType; navigation: any }) {
    const _renderItem = (_props: { item: any }) => {
        return (
            <TouchableOpacity
                style={styles.containerButton}
                activeOpacity={0.7}
                onPress={() => {
                    console.log("hi");
                    props.navigation.navigate("Todo");
                }}
            >
                <View style={styles.buttonContent}>
                    <View
                        style={[
                            styles.iconStyle,
                            {
                                backgroundColor: `${_props.item.color}`,
                            },
                        ]}
                    ></View>
                    <Text style={styles.buttonText}>{_props.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* IDEA: SVG or LinearGradient를 이용해서 gradient 사용? */}
            <View
                style={{
                    position: "absolute",
                    height: "50%",
                    width: "110%",
                    backgroundColor: "#9E9884",
                    top: "-20%",
                    borderRadius: 1000,
                    opacity: 0.7,
                }}
            ></View>
            <View style={styles.containerTop}>
                <Text style={styles.containerTopText}>오늘의 아침</Text>
            </View>
            <View style={styles.containerBottom}>
                <FlatList
                    data={menu}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.key}
                ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222221",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 1,
        justifyContent: "flex-end",
    },
    containerTopText: {
        color: "#DFCA96",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 60,
        marginBottom: "6%",
        // fontWeight:"bold"
    },
    containerBottom: {
        flex: 4,
        justifyContent: "center",
    },
    containerButton: {
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.8,
        alignItems: "flex-start",
        backgroundColor: "#535351",
        borderRadius: 10,
        height: "80%",
        marginBottom: "1%",
    },
    buttonContent: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 28,
        marginLeft: "4%",
    },
    iconStyle: {
        height: "70%",
        width: "22%",
        marginLeft: "3%",
        borderRadius: 10,
    },
});
