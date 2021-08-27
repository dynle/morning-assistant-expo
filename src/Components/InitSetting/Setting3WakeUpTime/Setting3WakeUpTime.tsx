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
        title: "월요일",
    },
    {
        key: 1,
        title: "화요일",
    },
    {
        key: 2,
        title: "수요일",
    },
    {
        key: 3,
        title: "목요일",
    },
    {
        key: 4,
        title: "금요일",
    },
    {
        key: 5,
        title: "토요일",
    },
    {
        key: 6,
        title: "일요일",
    },
];

// TODO: 지정한 시간 값을 백엔드에 임시 저장한 다음 맨 뒤에 설정 완료 버튼 누르면 FB에 저장
export default function Setting3WakeUpTime(props: {
    pageMoveHandler: (pageNumber: number) => void;
}) {
    const [date, setDate] = useState(new Date());
    // TODO: 초반 값을 0으로 설정하고 다음 시계 클릭하면 백엔드에 저장하도록, 마지막은 저장 버튼으로?
    const [meridiem, setMeridiem] = useState<string>("");
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
        setMeridiem(moment(currentDate).format("a"));
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
                        style={{paddingTop:'10%'}}
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
                                    style={[
                                        {
                                            height: clock_height,
                                            width: clock_width,
                                            borderRadius: clock_height / 2,
                                            marginRight: 50,
                                            justifyContent: "center",
                                        },
                                        (meridiem == "am" &&
                                            hour >= 7 &&
                                            hour < 12) ||
                                        (meridiem == "pm" &&
                                            (hour <= 5 || hour == 12))
                                            ? { backgroundColor: "#FFEEC0",shadowColor:"#E3BF7C",shadowOpacity:10,shadowRadius:15 }
                                            : { backgroundColor: "#BEBEBE",shadowColor:"#5E6574",shadowOpacity:10,shadowRadius:15 },
                                    ]}
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
                        style={{ maxHeight: "60%" }}
                        value={date}
                        mode={"time"}
                        display="spinner"
                        onChange={onChange}
                        minuteInterval={5}
                        textColor="white"
                    />
                    <Text style={styles.timeText}>
                        - {moment(date).format("LT")} -
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
        flex: 1.2,
        // backgroundColor:'black'
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
