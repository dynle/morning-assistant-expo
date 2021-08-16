import React, { useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Setting3Clock from "./Setting3Clock";
import { Divider } from "react-native-elements/dist/divider/Divider";

// Dummy data
const DATA = [
    {
        key: 0,
        title: "MON",
    },
    {
        key: 1,
        title: "TUES",
    },
    {
        key: 2,
        title: "WED",
    },
    {
        key: 3,
        title: "THURS",
    },
    {
        key: 4,
        title: "FRI",
    },
    {
        key: 5,
        title: "SAT",
    },
    {
        key: 6,
        title: "SUN",
    },
];

// TODO: 지정한 시간 값을 백엔드에 임시 저장한 다음 맨 뒤에 설정 완료 버튼 누르면 FB에 저장
export default function Setting3WakeUpTime(props: {
    pageMoveHandler: (pageNumber: number) => void;
}) {
    const [date, setDate] = useState(new Date());
    // TODO: 초반 값을 0으로 설정하고 다음 시계 클릭하면 백엔드에 저장하도록, 마지막은 저장 버튼으로?
    const [hour, setHour] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [currDayOfWeek, setCurrDayOfWeek] = useState("");
    const [isSelected, setIsSelected] = useState(0);

    const width = Dimensions.get("window").width;
    let clock_height = 200;
    let clock_width = 200;

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setHour(Number(moment(currentDate).format("h")));
        setMinutes(Number(moment(currentDate).format("mm")));
    };

    let refContainer = useRef<any>();
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.containerTop}>
                    <Text style={styles.containerTopText}>
                        당신은 언제 아침을{"\n"}맞이 하나요?
                    </Text>
                </View>
            </View>

            <View style={styles.containerRemainer}>
                <View style={styles.containerClock}>
                    <FlatList
                        data={DATA}
                        // automaticallyAdjustContentInsets={false}
                        contentContainerStyle={{
                            paddingHorizontal: width / 2 - 100,
                        }}
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
                                    refContainer.current!.scrollToIndex({
                                        index: item.key,
                                        animated: true,
                                        viewPosition: 0,
                                    });
                                }}
                            >
                                <View
                                    style={{
                                        height: clock_height,
                                        width: clock_width,
                                        backgroundColor: "#BEBEBE",
                                        borderRadius: clock_height / 2,
                                        marginRight: 50,
                                        justifyContent: "center",
                                    }}
                                >
                                    {index == isSelected && (
                                        <Setting3Clock
                                            width={clock_width}
                                            height={clock_width}
                                            hour={hour}
                                            minutes={minutes}
                                        ></Setting3Clock>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    ></FlatList>
                    <Text
                        style={{
                            color: "#C6BF9F",
                            fontSize: 20,
                            textAlign: "center",
                        }}
                    >
                        {currDayOfWeek}
                    </Text>
                </View>
                <View style={styles.containerTimePicker}>
                    <RNDateTimePicker
                        value={date}
                        mode={"time"}
                        display="spinner"
                        onChange={onChange}
                        minuteInterval={5}
                    />
                    <Text style={styles.timeText}>
                        - {moment(date).format("LT")} -
                    </Text>

                    {currDayOfWeek == "SUN" && (
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
                                    props.pageMoveHandler(3);
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
        backgroundColor: "#213443",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 1,
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
        lineHeight: 70,
    },
    timeText: {
        fontSize: 35,
        color: "#C6BF9F",
        textAlign: "center",
        marginBottom: 10,
    },
    containerClock: {
        flex: 1,
        // justifyContent: "center",
        // alignItems:'center',
    },
    containerTimePicker: {
        flex: 1.6,
        // alignSelf: "stretch",
    },
    hour_hand: {},
    min_hand: {},
});
