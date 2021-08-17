import { preventAutoHide } from "expo-splash-screen";
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Icon } from "react-native-elements";

import { MARGIN, Positions, SIZE } from "./Config";

interface TileProps {
    idx: number;
    id: string;
    onLongPress: () => void;
    handler: (tate: boolean, condition: string) => void;
}

const Tile = (props: TileProps) => {
    const [unselected, setUnselected] = useState(false);
    var icon;
    if (unselected){
        icon="plus-circle"
    }else{
        icon="minus-circle"
    }

    return (
        <View style={styles.container}>
            <View
                style={[styles.tile, unselected && styles.tileColorUnselected]}
            >
                <Icon
                    style={{ position: "absolute" }}
                    size={33}
                    type="font-awesome"
                    name={`${icon}`}
                    onPress={() => {
                        // TODO: 해당 타일이 맨 뒤로 넘어가고 index가 바뀌는 처리
                        setUnselected((prev) => !prev);
                    }}
                    containerStyle={styles.iconContainerStyle}
                ></Icon>
                <TouchableOpacity
                    // style={{zIndex:1}}
                    onPress={() => {
                        props.handler(true, props.id);
                    }}
                    // onLongPress={()=>console.log("long pressed")}
                    // delayLongPress={1500}
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
        borderColor: "#DDDCC3",
        borderWidth: 5,
        flex: 1,
        margin: MARGIN * 2,
        borderRadius: MARGIN + 20,
        paddingLeft: "5%",
        position: "relative",
    },
    tileColorUnselected: {
        opacity: 0.5,
    },
    title: {
        fontSize: 30,
        marginTop: "-5%",
    },
    order: {
        fontSize: 30,
        paddingTop: "45%",
    },
    iconContainerStyle: {
        width: 28,
        height: 28,
        marginLeft: "90%",
        marginTop: "-7%",
        backgroundColor: "white",
        borderRadius: 28 / 2,
        justifyContent: "center",
        alignItems: "center",
    },
});
