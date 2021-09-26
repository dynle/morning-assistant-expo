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
import { Button } from "react-native-elements";

export default function CloseMainScreen(props:{handler:(state:boolean)=>void}) {

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>CloseMainScreen</Text>
            <Button
                title="홈스크린"
                onPress={() => {
                    props.handler(false)
                }}
            />
        </View>
    );
}