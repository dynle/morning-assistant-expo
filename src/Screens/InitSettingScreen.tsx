import React, { useRef, useState, createContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import PagerView from "react-native-pager-view";

import Setting1Name from "../Components/InitSetting/Setting1Name";
import Setting2Intro from "../Components/InitSetting/Setting2Intro";
import Setting3WakeUpTime from "../Components/InitSetting/Setting3WakeUpTime/Setting3WakeUpTime";
import Setting4SlideSet from "../Components/InitSetting/Setting4SlideSet/Setting4SlideSet";
import Setting5ConfirmSlide from "../Components/InitSetting/Setting5ConfirmSlide";
import Setting6Completion from "../Components/InitSetting/Setting6Completion";
import { UserType } from "../fbase";

import { SettingContext } from "../Contexts/SettingContext";


export default function InitSettingScreen(props: {
    handlerIsNewUser: (state: boolean) => void;
    user: UserType;
}) {
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const [visited2, setVisited2] = useState(false);
    const [visited3, setVisited3] = useState(false);
    const [visited4, setVisited4] = useState(false);
    let pagerview = useRef<any>();

    const [settingData, setSettingData] = useState<(string | object | (string | number | Date)[])[]>([]);

    function pageMoveHandler(pageNumber: number) {
        pagerview.current.setPage(pageNumber);
    }

    function scrollEnabledHandler(enabled: boolean) {
        setIsScrollEnabled(enabled);
    }

    return (
        <SettingContext.Provider value={{settingData,setSettingData}}>
            <View style={styles.container}>
                <PagerView
                    ref={pagerview}
                    style={styles.pagerView}
                    initialPage={0}
                    scrollEnabled={isScrollEnabled}
                    // 설정 컴포넌트 간에 스왑 막기
                    onPageSelected={(e) => {
                        if (
                            (visited2 == false ||
                                visited3 == false ||
                                visited4 == false) &&
                            (e.nativeEvent.position == 2 ||
                                e.nativeEvent.position == 3 ||
                                e.nativeEvent.position == 4)
                        ) {
                            setIsScrollEnabled(false);
                        }
                        if (e.nativeEvent.position == 2) {
                            setVisited2(true);
                        } else if (e.nativeEvent.position == 3) {
                            setVisited3(true);
                        } else if (e.nativeEvent.position == 4) {
                            setVisited4(true);
                        }
                    }}
                >
                    <View style={styles.page} key="0">
                        <Setting1Name
                            pageMoveHandler={pageMoveHandler}
                            scrollEnabledHandler={scrollEnabledHandler}
                        />
                    </View>
                    <View style={styles.page} key="1">
                        <Setting2Intro />
                    </View>
                    <View style={styles.page} key="2">
                        <Setting3WakeUpTime
                            pageMoveHandler={pageMoveHandler}
                            scrollEnabledHandler={scrollEnabledHandler}
                        />
                    </View>
                    <View style={styles.page} key="3">
                        <Setting4SlideSet
                            pageMoveHandler={pageMoveHandler}
                            scrollEnabledHandler={scrollEnabledHandler}
                        />
                    </View>
                    <View style={styles.page} key="4">
                        <Setting5ConfirmSlide
                            pageMoveHandler={pageMoveHandler}
                            scrollEnabledHandler={scrollEnabledHandler}
                        />
                    </View>
                    <View style={styles.page} key="5">
                        <Setting6Completion
                            handlerIsNewUser={props.handlerIsNewUser}
                            user={props.user}
                        />
                    </View>
                </PagerView>
            </View>
        </SettingContext.Provider>
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
