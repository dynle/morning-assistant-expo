import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MARGIN, Positions } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { Button } from "react-native-elements";
import { commonStyle } from "../../../Styles/CommonStyles";

// dummy data
var tiles = [
    {
        key: 0,
        id: "알람",
        show:true
    },
    {
        key: 1,
        id: "시간",
        show:true
    },
    {
        key: 2,
        id: "일정",
        show:true
    },
    {
        key: 3,
        id: "날씨",
        show:true
    },
    {
        key: 4,
        id: "뉴스",
        show:true
    },
    {
        key: 5,
        id: "타인의 어제",
        show:true
    },
];

// var tiles = {
//     "알람":{key:0,show:true},
//     "시간":{key:1,show:true},
//     "일정":{key:2,show:true},
//     "날씨":{key:3,show:true},
//     "뉴스":{key:4,show:true},
//     "타인의 어제":{key:5,show:true},
// }

const initial_value: Positions = {
    "알람": 0,
    "시간": 1,
    "일정": 2,
    "날씨": 3,
    "뉴스": 4,
    "타인의 어제": 5,
};

const DragAndDrop = (props: {
    modalHandler: (state: boolean, condition: string) => void;
    pageMoveHandler: (pageNumber: number) => void;
}) => {
    const [data, setData] = useState(initial_value);

    const pushBackHandler = (id: string,show:boolean) => {
        // console.log(tiles)
        console.log(data[id]);
        console.log(...tiles)
        // setData((prevData)=>({
        //     ...prevData,
        //     [id]
        // }))
        // if (data[id] == -1) {
        //     setData((prevData) => ({
        //         ...prevData,
        //         [id]: data[id],
        //     }));
        // } else {
        //     setData((prevData) => ({
        //         ...prevData,
        //         [id]: -1,
        //     }));
        // }
    };
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
                    onDragEnd={
                        (positions) => {
                            setData(positions);
                            console.log(positions);
                        }
                        // console.log(JSON.stringify(positions, null, 2))
                        // console.log(positions)
                    }
                >
                    {[...tiles].map((tile, index) => (
                        <Tile
                            key={index}
                            idx={data[`${tile.id}`] + 1}
                            id={tile.id}
                            show={tile.show}
                            onLongPress={() => true}
                            handler={props.modalHandler}
                            pushHandler={pushBackHandler}
                        />
                    ))}
                </SortableList>
                <Button
                    title="저장"
                    titleStyle={{ color: "black" }}
                    buttonStyle={[commonStyle.buttonStyle, { minWidth: "25%" }]}
                    style={{ alignItems: "center" }}
                    onPress={() => {
                        console.log("저장");
                        props.pageMoveHandler(4);
                    }}
                ></Button>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default DragAndDrop;
