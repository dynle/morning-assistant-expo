import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useEffect } from "react-native-vector-icons/node_modules/@types/react";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    BackgroundCircle,
    homescreenStyle,
} from "../../Styles/HomeScreenStyle";
import Setting3Clock from "../InitSetting/Setting3WakeUpTime/Setting3Clock";

// Dummy data
const DATA = [
    {
        key: 0,
        title: "월요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 1,
        title: "화요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 2,
        title: "수요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 3,
        title: "목요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 4,
        title: "금요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 5,
        title: "토요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
    {
        key: 6,
        title: "일요일",
        meridiem: "",
        hour: 0,
        minutes: 0,
    },
];

export default function MenuAlarm(props: { navigation: any }) {
    const [item, setItem] = useState(DATA[0]);
    const [date, setDate] = useState(new Date());
    const [currDayOfWeek, setCurrDayOfWeek] = useState("월요일");
    const [isSelected, setIsSelected] = useState(0);

    const width = Dimensions.get("window").width;
    let clock_height = 200;
    let clock_width = 200;
    // let clock_height = RFPercentage(30);
    // let clock_width = RFPercentage(30);
    let refContainer = useRef<any>();

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        item.meridiem = moment(currentDate).format("a").toUpperCase();
        item.hour = Number(moment(currentDate).format("h"));
        item.minutes = Number(moment(currentDate).format("mm"));
    };

    // TODO: 컴포넌트 렌더링 될때마다 FB에 저장된 시간 불러와서 초기값 설정해 주기
    // useEffect(()=>{})

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
                    알람 시간 변경
                </Text>
            </View>
            <View style={homescreenStyle.containerBottom}>
                <View style={[homescreenStyle.containerBottomFig, { flex: 3.5 }]}>
                    <View style={styles.containerClock}>
                        <FlatList
                            data={DATA}
                            contentContainerStyle={{
                                paddingHorizontal: width / 2 - 100,
                            }}
                            // style={{ paddingTop: "10%" }}
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
                            // snapToInterval={200 + 50}
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
                                                item.hour >= 7 &&
                                                item.hour < 12) ||
                                            (item.meridiem == "오후" &&
                                                (item.hour <= 5 ||
                                                    item.hour == 12))
                                                ? {
                                                    backgroundColor:"#FFEEC0",
                                                    shadowColor: "#E3BF7C",
                                                    shadowOpacity: 10,
                                                    shadowRadius: 15,
                                                }
                                                : {
                                                    backgroundColor:"#BEBEBE",
                                                    shadowColor: "#5E6574",
                                                    shadowOpacity: 10,
                                                    shadowRadius: 15,
                                                },
                                        ]}
                                    >
                                        {index == isSelected && (
                                            <Setting3Clock
                                                width={clock_width}
                                                height={clock_width}
                                                hour={item.hour}
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
                </View>
                <View style={homescreenStyle.containerBottomMid}>
                    <View style={styles.containerTimePicker}>
                        <RNDateTimePicker
                            style={{ maxHeight: "70%",minWidth:"70%" }}
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
                                item.hour +
                                ":" +
                                item.minutes.toLocaleString("en-US", {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false,
                                }) +
                                " " +
                                " -"}
                        </Text>
                    </View>
                </View>
                <View style={homescreenStyle.containerBottomButton}>
                    <Button
                        title="저장"
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
    containerClock: {
        flex: 1.2,
    },
    containerTimePicker: {
        flex: 1.3,
    },
    timeText: {
        fontSize: RFPercentage(6),
        color: "#C6BF9F",
        textAlign: "center",
        marginBottom: 10,
    },
});
