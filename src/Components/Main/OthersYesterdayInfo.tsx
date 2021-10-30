import moment from "moment";
import React, { useState } from "react";
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
import { MainScreenStyles } from "../../Styles/MainScreenStyles";

export default function OthersYesterdayInfo() {
    return (
        <View style={[MainScreenStyles.container,{backgroundColor:'#F5E6DD'}]}>
            <View style={MainScreenStyles.containerTop}>
                <Text style={[MainScreenStyles.containerTopText,{color:'#4E4D47'}]}>
                    타인의 어제 
                </Text>
            </View>
            <View style={MainScreenStyles.containerBottom}>
                <Text style={[MainScreenStyles.dayofweekText,{color:'#7D773D'}]}>
                    {moment().format("dddd")}
                </Text>
            </View>
        </View>
    );
}
