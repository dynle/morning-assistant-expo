import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";
import RNDateTimePicker from "@react-native-community/datetimepicker";
// import DateTimePicker from '@react-native-community/datetimepicker'

export default function Setting2WakeUpTime() {
    const [date, setDate] = useState(new Date());
    console.log(date);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log("changed time: ",currentDate);
    };
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Second Component</Text>
            <Button title="Sign Out" onPress={signOutUtil}></Button>
            <View style={{ alignSelf: "stretch" }}>
                {/* FIXME: timezone이 달라서 인가 시간이 계속 안맞음 */}
                <RNDateTimePicker
                    // testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    display="spinner"
                    timeZoneOffsetInMinutes={9*60} //not working
                    onChange={onChange}
                />
            </View>
            {/* <RNDateTimePicker value={date} mode="time"></RNDateTimePicker> */}
            {/* <Button title='Time Picker' onPress={DateTimePicker}></Button> */}
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
});
