import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { Pressable, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

// dummy data
const tiles = [
    {
        key: 0,
        id: "알람",
    },
    {
        key: 1,
        id: "시간",
    },
    {
        key: 2,
        id: "인삿말",
    },
    {
        key: 3,
        id: "날씨",
    },
    {
        key: 4,
        id: "뉴스",
    },
    {
        key: 5,
        id: "타인의 어제",
    },
];

const DragAndDrop = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    // backgroundColor: "black",
                    // backgroundColor: "#D4C8BB",
                    paddingHorizontal: MARGIN,
                }}
            >
                <SortableList
                    editing={true}
                    onDragEnd={(positions) =>
                        console.log(JSON.stringify(positions, null, 2))
                        // console.log(Object.values(positions))
                    }
                >
                    {[...tiles].map((tile, index) => (
                        <Tile
                            key={index}
                            idx={index}
                            id={tile.id}
                            onLongPress={() => true}
                        />
                    ))}
                </SortableList>
                <Button
                    title="저장"
                    titleStyle={{ color: "black" }}
                    buttonStyle={{
                        minWidth: "25%",
                        borderRadius: 20,
                        backgroundColor: "#F3EDE1",
                    }}
                    style={{ alignItems: "center" }}
                    onPress={() => {
                        console.log("저장");
                    }}
                ></Button>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default DragAndDrop;
