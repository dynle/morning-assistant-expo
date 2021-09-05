import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    homescreenStyle,
    BackgroundCircle,
} from "../../Styles/HomeScreenStyle";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// temp variables
let clock_height = RFPercentage(20);
let clock_width = RFPercentage(20);

// dummy data
var todoData = [
    {
        key: 1,
        title: "Exercise",
        time: 9,
    },
    {
        key: 2,
        title: "Study",
        time: 9,
    },
    {
        key: 3,
        title: "Study",
        time: 9,
    },
    {
        key: 4,
        title: "Study",
        time: 9,
    },
];

export default function MenuTodo(props: { navigation: any }) {

    const _renderItem = (_props: { item: any }) => {
        return (
                <View
                    style={{
                        backgroundColor: "#535351",
                        width: width * 0.8,
                        height: height * 0.12,
                        borderRadius:RFPercentage(2),
                        justifyContent:'center',
                        alignItems:'center',
                        marginBottom: 5,
                    }}
                >
                    <Text>{_props.item.title}</Text>
                    <Text>{_props.item.time}</Text>
                </View>
        );
    };

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
                    일정
                </Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <View style={homescreenStyle.containerBottomFig}>
                    <View style={styles.containerFig}></View>
                    <Text style={styles.dayOfWeekStyle}>
                        {moment().add(1, "days").format("dddd")}
                    </Text>
                </View>
                <View style={homescreenStyle.containerBottomMid}>
                    <FlatList
                        data={todoData}
                        renderItem={_renderItem}
                        keyExtractor={(item) => item.key.toString()}
                        scrollEnabled={true}
                        contentContainerStyle={{backgroundColor:'white'}}
                    ></FlatList>
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
        backgroundColor: "#C4C4C4",
        shadowColor: "#C4C4C4",
        shadowOpacity: 10,
        shadowRadius: 15,
    },
    dayOfWeekStyle: {
        textAlign: "center",
        color: "#DFCA96",
        fontSize: RFPercentage(4),
        marginTop: "5%",
    },
});
