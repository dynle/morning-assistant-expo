import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MARGIN, SIZE } from "./Config";

interface TileProps {
    idx: number;
    id: string;
    onLongPress: () => void;
}

const Tile = (props: TileProps) => {
    return (
        <View style={styles.container} pointerEvents="none">
            <View style={styles.tile}>
                <Text style={styles.title}>{props.id}</Text>
                <Text style={styles.order}>{props.idx}</Text>
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
        backgroundColor: "#FFEDC0",
        // justifyContent: "center",
        flex: 1,
        margin: MARGIN * 2,
        borderRadius: MARGIN + 20,
        paddingLeft: "7%",
    },
    title:{
        fontSize: 33,
        paddingTop: "10%",
    },
    order:{
        fontSize: 30,
        paddingTop:"45%"
    }
});