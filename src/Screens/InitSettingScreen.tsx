import React, { useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import PagerView from "react-native-pager-view";

import Setting1Name from "../Components/InitSetting/Setting1Name";
import Setting2Intro from "../Components/InitSetting/Setting2Intro";
import Setting3WakeUpTime from "../Components/InitSetting/Setting3WakeUpTime/Setting3WakeUpTime";
import Setting4SlideSet from "../Components/InitSetting/Setting4SlideSet/Setting4SlideSet";
import Setting5ConfirmSlide from "../Components/InitSetting/Setting5ConfirmSlide";
import Setting6Completion from "../Components/InitSetting/Setting6Completion";

export default function InitSettingScreen() {
    let pagerview = useRef<any>();

    function pageMoveHandler(pageNumber:number){
        pagerview.current.setPage(pageNumber)
    }

    return (
        // TODO: 걱각의 셋팅을 바로 DB에 넣지말고 백엔드에 저장한 다음 완료 버튼 누르면 다 올라가게 = AsyncStorage
        <View style={styles.container}>
            <PagerView ref={pagerview} style={styles.pagerView} initialPage={0} showPageIndicator={true}>
                <View style={styles.page} key="1">
                    <Setting1Name pageMoveHandler={pageMoveHandler}/>
                    {/* <Button title="test"></Button> */}
                </View>
                <View style={styles.page} key="2">
                    <Setting2Intro />
                </View>
                <View style={styles.page} key="3">
                    <Setting3WakeUpTime pageMoveHandler={pageMoveHandler}/>
                </View>
                <View style={styles.page} key="4">
                    <Setting4SlideSet />
                </View>
                <View style={styles.page} key="5">
                    <Setting5ConfirmSlide />
                </View>
                <View style={styles.page} key="6">
                    <Setting6Completion />
                </View>
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#222323" },
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
