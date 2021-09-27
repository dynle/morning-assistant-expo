import React, { useEffect, useState } from "react";
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
import moment from "moment";
import 'moment/locale/ko';
import { RFPercentage } from "react-native-responsive-fontsize";

export default function TimeInfo() {
    let timer: any=null;
    const [time,setTime] = useState(moment());

    useEffect(()=>{
        timer = setInterval(()=>{
            setTime(moment());
        },1000);
        return () => {
            clearInterval(timer);
        }
    },[])

    return (
        <View style={{alignItems:'center'}}>
            <Text style={styles.timeYear}>{moment().format('YYYY')}</Text>
            <Text style={styles.timeMonDate}>{moment().format('MMM Do')}</Text>
            <Text style={styles.timeTime}>{moment().format('LT')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timeYear: {
        fontSize: RFPercentage(12),
        fontWeight: "bold",
        color: '#AEAC99',
    },
    timeMonDate: {
        fontSize: RFPercentage(8),
        fontWeight: "bold",
        margin: '15%',
        color: '#AEAC99',
    },
    timeTime: {
        fontSize: RFPercentage(11),
        fontWeight: "bold",
        color: '#AEAC99',
    },
});