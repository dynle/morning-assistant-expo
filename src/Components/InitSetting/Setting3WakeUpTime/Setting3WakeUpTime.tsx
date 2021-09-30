import React, { useEffect, useRef, useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Setting3Clock from "./Setting3Clock";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SettingContext } from "../../../Contexts/SettingContext";

interface DATA_TYPE {
    key: number;
    title: string;
    meridiem: string;
    hour: number[];
    minutes: number;
}

// Dummy data
const DATA: DATA_TYPE[] = [
    {
        key: 0,
        title: "월요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 1,
        title: "화요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 2,
        title: "수요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 3,
        title: "목요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 4,
        title: "금요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 5,
        title: "토요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
    {
        key: 6,
        title: "일요일",
        meridiem: "",
        hour: [0,0],
        minutes: 0,
    },
];

export default function Setting3WakeUpTime(props: {
    pageMoveHandler: (pageNumber: number) => void;
    scrollEnabledHandler: (enabled: boolean) => void;
}) {
    const { settingData, setSettingData } = useContext(SettingContext);
    const [item, setItem] = useState(DATA[0]);
    const [date, setDate] = useState(new Date());
    const [currDayOfWeek, setCurrDayOfWeek] = useState("월요일");
    const [isSelected, setIsSelected] = useState(0);

    const width = Dimensions.get("window").width;
    let clock_height = 200;
    let clock_width = 200;

    // let clock_height = width*0.6;
    // let clock_width = width*0.6;

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        item.meridiem = moment(currentDate).format("a").toUpperCase();
        item.hour = [Number(moment(currentDate).format("h")),Number(moment(currentDate).format("H"))];
        item.minutes = Number(moment(currentDate).format("mm"));
    };

    let refContainer = useRef<any>();
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.containerTop}>
                    <Text style={styles.containerTopText}>
                        당신은 언제 아침을{"\n"}맞이 하나요?
                    </Text>
                    <Text style={{ color: "white", fontSize: 20 }}>
                        스와이프해서 요일별로 설정하세요!
                    </Text>
                </View>
            </View>

            <View style={styles.containerRemainer}>
                <View style={styles.containerClock}>
                    <FlatList
                        data={DATA}
                        contentContainerStyle={{
                            paddingHorizontal: width / 2 - 100,
                        }}
                        style={{ paddingTop: RFPercentage(6) }}
                        keyExtractor={(item) => item.key.toString()}
                        ref={refContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={0}
                        getItemLayout={(data, index) => ({
                            length: 200,
                            offset: 250 * index,
                            index,
                        })}
                        snapToAlignment={"start"}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrDayOfWeek(item.title);
                                    setIsSelected(index);
                                    setItem(DATA[index]);
                                    refContainer.current!.scrollToIndex({
                                        index: item.key,
                                        animated: true,
                                        viewPosition: 0,
                                    });
                                }}
                            >
                                <View
                                    style={[
                                        {
                                            height: clock_height,
                                            width: clock_width,
                                            borderRadius: clock_height / 2,
                                            marginRight: 50,
                                            justifyContent: "center",
                                        },
                                        (item.meridiem == "오전" &&
                                            item.hour[0] >= 7 &&
                                            item.hour[0] < 12) ||
                                        (item.meridiem == "오후" &&
                                            (item.hour[0] <= 5 || item.hour[0] == 12))
                                            ? {
                                                backgroundColor: "#FFEEC0",
                                                shadowColor: "#E3BF7C",
                                                shadowOpacity: 10,
                                                shadowRadius: RFPercentage(2),
                                            }
                                            : {
                                                backgroundColor: "#BEBEBE",
                                                shadowColor: "#5E6574",
                                                shadowOpacity: 10,
                                                shadowRadius: RFPercentage(2),
                                            },
                                    ]}
                                >
                                    {index == isSelected && (
                                        <Setting3Clock
                                            width={clock_width}
                                            height={clock_width}
                                            hour={item.hour[0]}
                                            minutes={item.minutes}
                                        ></Setting3Clock>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    ></FlatList>
                    <Text
                        style={{
                            color: "#C6BF9F",
                            fontSize: RFPercentage(4),
                            textAlign: "center",
                        }}
                    >
                        {currDayOfWeek}
                    </Text>
                </View>
                <View style={styles.containerTimePicker}>
                    <RNDateTimePicker
                        style={{ maxHeight: "60%" }}
                        value={date}
                        mode={"time"}
                        display="spinner"
                        onChange={onChange}
                        minuteInterval={5}
                        textColor="white"
                    />
                    <Text style={styles.timeText}>
                        {"- " +
                            item.meridiem +
                            " " +
                            item.hour[0] +
                            ":" +
                            item.minutes.toLocaleString("en-US", {
                                minimumIntegerDigits: 2,
                                useGrouping: false,
                            }) +
                            " " +
                            " -"}
                    </Text>

                    {currDayOfWeek == "일요일" && (
                        <ThemeProvider
                            theme={{
                                Button: { titleStyle: { color: "black" } },
                            }}
                        >
                            <Button
                                title="저장"
                                titleStyle={{ color: "black" }}
                                buttonStyle={{
                                    minWidth: "25%",
                                    borderRadius: 20,
                                    backgroundColor: "#F3EDE1",
                                }}
                                style={{ alignItems: "center" }}
                                onPress={() => {
                                    var found = false;
                                    for (var i = 0; i < 7; i++) {
                                        if (DATA[i].hour[0] == 0) {
                                            found = true;
                                            Alert.alert(
                                                "모든 요일에 시간을 입력해 주세요."
                                            );
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        setSettingData([...settingData,DATA])
                                        props.scrollEnabledHandler(true);
                                        props.pageMoveHandler(3);
                                        console.log(DATA);
                                    }
                                }}
                            ></Button>
                        </ThemeProvider>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#474747",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 0.8,
    },
    containerRemainer: {
        flex: 2.9,
        // alignItems:'center',
    },
    containerTop: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerTopText: {
        fontSize: 35,
        color: "#C6BF9F",
        textAlign: "center",
        lineHeight: 50,
    },
    timeText: {
        fontSize: 35,
        color: "#C6BF9F",
        textAlign: "center",
        marginBottom: 10,
    },
    containerClock: {
        flex: 1.5,
        // backgroundColor:'orange'
        // justifyContent: "center",
        // alignItems:'center',
    },
    containerTimePicker: {
        flex: 1.3,
        // justifyContent:'flex-start'
    },
    hour_hand: {},
    min_hand: {},
});
