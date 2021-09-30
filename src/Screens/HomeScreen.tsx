import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { UserType } from "../fbase";
import Todo from "../../assets/homescreen/Todo.png";
import Share from "../../assets/homescreen/Share.png";
import Alarm from "../../assets/homescreen/Alarm.png";
import Slide from "../../assets/homescreen/Slide.png";
import Setting from "../../assets/homescreen/Setting.png";
import { homescreenStyle, BackgroundCircle } from "../Styles/HomeScreenStyle";
import { cancelAllScheduledPushNotification } from "../Utils/NotificationUtil";
import { Button } from "react-native-elements";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

const menu = [
    {
        key: "1",
        color: "#2C838B",
        image: Todo,
        title: "일정 추가",
        navigate: "Todo",
    },
    {
        key: "2",
        color: "#74ADAE",
        image: Share,
        title: "타인의 어제 공유",
        navigate: "Share",
    },
    {
        key: "3",
        color: "#F5BCA2",
        image: Alarm,
        title: "알람 시간 변경",
        navigate: "Alarm",
    },
    {
        key: "4",
        color: "#F19569",
        image: Slide,
        title: "슬라이드 변경",
        navigate: "Slide",
    },
    {
        key: "5",
        color: "#ED8049",
        image: Setting,
        title: "설정",
        navigate: "Setting",
    },
];

// delete props: { user: UserType } for test
export default function HomeScreen(props: { user: UserType; navigation: any }) {
    const _renderItem = (_props: { item: any }) => {
        return (
            <TouchableOpacity
                style={styles.containerButton}
                activeOpacity={0.8}
                onPress={() => {
                    props.navigation.navigate(_props.item.navigate);
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
                    >
                        <Image
                            source={_props.item.image}
                            style={styles.iconSize}
                        ></Image>
                    </View>
                    <Text style={styles.buttonText}>{_props.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={homescreenStyle.container}>
            <BackgroundCircle/>
            <View style={homescreenStyle.containerTop}>
                <Text style={homescreenStyle.containerTopText}>오늘의 아침</Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <FlatList
                    data={menu}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.key}
                    scrollEnabled={false}
                ></FlatList>
                {/* test */}
                <Button title="get" onPress={async ()=> {console.log(await getAllScheduledNotificationsAsync());}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerButton: {
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.13,
        alignItems: "flex-start",
        backgroundColor: "#535351",
        borderRadius: 10,
        marginBottom: "6%",
    },
    buttonContent: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 28,
        // marginLeft: "4%",
        textAlign: "center",
        width: "78%",
    },
    iconStyle: {
        height: "70%",
        width: "22%",
        marginLeft: "3%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    iconSize: { width: "65%", height: "65%" },
});
