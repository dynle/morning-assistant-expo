import moment from "moment";
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
import { RFPercentage } from "react-native-responsive-fontsize";
import { MainScreenStyles } from "../../Styles/MainScreenStyles";

const menu = [
    {
        key: "1",
        title: "일정 추가",
        navigate: "Todo",
    },
    {
        key: "2",
        title: "타인의 어제 공유",
        navigate: "Share",
    },
    {
        key: "3",
        title: "알람 시간 변경",
        navigate: "Alarm",
    },
    {
        key: "4",
        title: "슬라이드 변경",
        navigate: "Slide",
    },
    {
        key: "5",
        title: "설정",
        navigate: "Setting",
    },
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const _renderItem = (_props: { item: any }) => {
    return (
        <View style={styles.containerButton}>
            <View style={styles.todoTitle}>
                <Text style={styles.todoTitleText}>이메일</Text>
            </View>
            <View style={styles.todoTime}>
                <Text style={styles.todoTimeText}>02:30</Text>
            </View>
        </View>
    );
};

export default function TodoInfo() {
    const [todoList, SetTodoList] = useState<Array<any>>([]);

    async function getTodo() {}

    useEffect(() => {
        // getTodo();
    }, []);

    return (
        <View
            style={[MainScreenStyles.container, { backgroundColor: "#797979" }]}
        >
            <View style={MainScreenStyles.containerTop}>
                <Text
                    style={[
                        MainScreenStyles.containerTopText,
                        { color: "#E0DFD0" },
                    ]}
                >
                    해야 할 일
                </Text>
            </View>
            <View style={MainScreenStyles.containerBottom}>
                <Text
                    style={[
                        MainScreenStyles.dayofweekText,
                        { color: "#D0C777" },
                    ]}
                >
                    {moment().format("dddd")}
                </Text>
                {/* {todoList.length > 0 ? (
                    <FlatList
                        data={menu}
                        renderItem={_renderItem}
                        keyExtractor={(item) => item.key}
                        scrollEnabled={true}
                        contentContainerStyle={{ marginTop: RFPercentage(2) }}
                    ></FlatList>
                ) : (
                    <Text style={styles.noTodo}>등록된 일정이{'\n'}없습니다!</Text>
                )} */}
                <FlatList
                        data={menu}
                        renderItem={_renderItem}
                        keyExtractor={(item) => item.key}
                        scrollEnabled={true}
                        contentContainerStyle={{ marginTop: RFPercentage(2) }}
                    ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerButton: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.12,
        backgroundColor: "#92ACD6",
        borderRadius: 10,
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "center",
    },
    todoTitle: {
        marginLeft: RFPercentage(3),
    },
    todoTime: {
        marginLeft: "auto",
        marginRight: RFPercentage(3),
    },
    todoTitleText: {
        color: "black",
        fontSize: RFPercentage(6),
    },
    todoTimeText: {
        color: "white",
        fontSize: RFPercentage(6),
    },
    noTodo: {
        color:'white',
        fontSize: RFPercentage(5),
        marginTop: RFPercentage(5),
        textAlign:'center',
        lineHeight: RFPercentage(7)
    }
});
