import React, { useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

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
export default function Setting3WakeUpTime() {
    const [date, setDate] = useState(new Date());
    const [currDayOfWeek, setCurrDayOfWeek] = useState("");

    const width = Dimensions.get("window").width;

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log("changed time: ", moment(currentDate).format("LT"));
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
                        // contentContainerStyle={{
                        //     paddingHorizontal:
                        //         width / 2 - 100,
                        // }}
                        keyExtractor={(item) => item.key.toString()}
                        ref={refContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={0}
                        getItemLayout={(data, index) =>
                            // Max 5 items visibles at once
                            // {length: Dimensions.get('window').width / 2, offset: Dimensions.get('window').width / 2* index, index}
                            ({ length: 200, offset: 250 * index, index })
                        }
                        snapToAlignment={"center"}
                        // snapToInterval={200 + 50}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrDayOfWeek(item.title);
                                    refContainer.current!.scrollToIndex({
                                        index: item.key,
                                        animated: true,
                                        viewPosition: 0.5,
                                    });
                                }}
                            >
                                <View
                                    style={{
                                        height: 200,
                                        width: 200,
                                        backgroundColor: "#C4C4C4",
                                        borderRadius: 100,
                                        marginRight: 50,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>
                                        {item.title}
                                    </Text>
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
                    <Button
                        title="저장"
                        style={{ alignItems: "center" }}
                    ></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#48473D",
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
    },
    containerClock: {
        flex: 1,
        justifyContent: "flex-start",
        // alignItems:'center',
    },
    containerTimePicker: {
        flex: 1.6,
        // alignSelf: "stretch",
    },
});
