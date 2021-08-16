import { preventAutoHide } from "expo-splash-screen";
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Pressable,
} from "react-native";

import { MARGIN, Positions, SIZE } from "./Config";

interface TileProps {
    idx: number;
    id: string;
    onLongPress: () => void;
    handler: (tate: boolean, condition: string) => void;
}

const Tile = (props: TileProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.tile}>
                <TouchableOpacity
                    onPress={() => {
                        props.handler(true, props.id);
                    }}
                >
                    <Text style={styles.title}>{props.id}</Text>
                    <Text style={styles.order}>{props.idx}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Tile;

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
    },
    tile: {
        backgroundColor: "#F3EDE1",
        // justifyContent: "center",
        flex: 1,
        margin: MARGIN * 2,
        borderRadius: MARGIN + 20,
        paddingLeft: "7%",
    },
    title: {
        fontSize: 33,
        paddingTop: "10%",
    },
    order: {
        fontSize: 30,
        paddingTop: "45%",
    },
});
