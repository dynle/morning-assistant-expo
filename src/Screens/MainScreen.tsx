import React, { useRef, useState } from "react";
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
import PagerView from "react-native-pager-view";
import TimeInfo from "../Components/Main/TimeInfo";
import TodoInfo from "../Components/Main/TodoInfo";
import WeatherInfo from "../Components/Main/WeatherInfo";
import NewsInfo from "../Components/Main/NewsInfo";
import OthersYesterdayInfo from "../Components/Main/OthersYesterdayInfo";
import CloseMainScreen from "../Components/Main/CloseMainScreen";

export default function MainScreen(props:{handler:(state:boolean)=>void}) {
    let pagerview = useRef<any>();
    return (
        <View style={styles.container}>
            <PagerView
                ref={pagerview}
                style={styles.pagerView}
                scrollEnabled={true}
                // initialPage={0}
            >
                {/* TODO: 순서는 FB에서 가져온 순서로 map 돌려서 만들어 주면 될듯? */}
                <View style={styles.page}>
                    <TimeInfo />
                </View>
                <View style={styles.page}>
                    <TodoInfo />
                </View>
                <View style={styles.page}>
                    <WeatherInfo />
                </View>
                <View style={styles.page}>
                    <NewsInfo />
                </View>
                <View style={styles.page}>
                    <OthersYesterdayInfo />
                </View>
                <View style={styles.page}>
                    <CloseMainScreen handler={props.handler}/>
                </View>
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#292929" },
    pagerView: {
        flex: 1,
        // justifyContent: "center",
        width: Dimensions.get("window").width,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
    },
});
