import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MARGIN, SIZE } from "./Config";

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
    },
});
interface TileProps {
    id: string;
    onLongPress: () => void;
}

const Tile = (props: TileProps) => {
    return (
        <View style={styles.container} pointerEvents="none">
            <View
                style={{
                    // backgroundColor: "white",
                    backgroundColor: "#FFEDC0",
                    justifyContent: "center",
                    flex: 1,
                    margin: MARGIN * 2,
                    borderRadius: MARGIN+20,
                }}
            >
                <Text style={{ textAlign: "center", color: "black" }}>
                    {props.id}
                </Text>
            </View>
        </View>
    );
};

export default Tile;
