import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

// TODO: 지정한 시간 값을 백엔드에 임시 저장한 다음 맨 뒤에 설정 완료 버튼 누르면 FB에 저장
export default function Setting3WakeUpTime() {
    const [date, setDate] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log("changed time: ", moment(currentDate).format("LT"));
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.containerTopText}>
                    당신은 언제 아침을{"\n"}맞이 하나요?
                </Text>
            </View>
            <View>
                <Text style={{ color: "white", fontSize: 50 }}>시계 자리</Text>
            </View>
            <View style={{ alignSelf: "stretch", flex: 1 }}>
                <Text style={styles.timeText}>
                    - {moment(date).format("LT")} -
                </Text>
                <RNDateTimePicker
                    value={date}
                    mode={"time"}
                    display="spinner"
                    onChange={onChange}
                    minuteInterval={5}
                />
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
    containerTop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTopText: {
        fontSize: 40,
        color: "#C6BF9F",
        textAlign: "center",
        lineHeight: 70,
    },
    timeText: {
        fontSize: 40,
        color: "#C6BF9F",
        textAlign: "center",
    },
});
