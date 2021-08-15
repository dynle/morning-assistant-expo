import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { MARGIN, Positions } from "./Config";
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

const temp: Positions = {
    "알람": 0,
    "시간": 1,
    "인삿말": 2,
    "날씨": 3,
    "뉴스": 4,
    "타인의 어제": 5,
}

const DragAndDrop = () => {
    const [data,setData] = useState<Positions>(temp)
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
                        {setData(positions);
                        console.log(positions)
                        }
                        // console.log(JSON.stringify(positions, null, 2))
                        // console.log(positions)
                    }
                >
                    {[...tiles].map((tile, index) => (
                        <Tile
                            key={index}
                            idx={data![`${tile.id}`]+1}
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
