import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MARGIN, Positions } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { Button } from "react-native-elements";
import { commonStyle } from "../../../Styles/CommonStyles";

// dummy data
var tiles = [
    {
        id: "알람",
        show: true,
    },
    {
        id: "시간",
        show: true,
    },
    {
        id: "일정",
        show: true,
    },
    {
        id: "날씨",
        show: true,
    },
    {
        id: "뉴스",
        show: true,
    },
    {
        id: "타인의 어제",
        show: true,
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
    알람: 0,
    시간: 1,
    일정: 2,
    날씨: 3,
    뉴스: 4,
    "타인의 어제": 5,
};

var menu = ["알람", "시간", "일정", "날씨", "뉴스", "타인의 어제"];

const DragAndDrop = (props: {
    modalHandler: (state: boolean, condition: string) => void;
    pageMoveHandler?: (pageNumber: number) => void;
    scrollEnabledHandler?: (enabled: boolean) => void;
}) => {
    const [data, setData] = useState<Positions>(initial_value);
    const [tilesData, setTilesData] = useState(tiles);

    const pushBackHandler = (id: string, show: boolean) => {
        // console.log(data[id]);
        // console.log(show);
        //menu를 돌려서 해당 인덱스 보다 숫자가 높으면 -1해주고 해당 인덱스는 5로 맞춰주기
        var temp = data;
        if (show == false) {
            // move an element to the end of an array
            for (var i = 1; i < 6; i++) {
                if (temp[id] < temp[menu[i]]) {
                    temp[menu[i]] -= 1;
                    // console.log("changed");
                }
            }
            temp[id] = 5;
            menu.push(menu.splice(menu.indexOf(id), 1)[0]);
            setData({ ...temp });
        }

        // TODO: tileData를 업데이트해서 맨 뒤로 보내기 / 리스트를 업데이트 하면 X한 목록이 다시 살아남
        var target: number = 0;
        var tempTilesData = tilesData;
        for (var i = 1; i < 6; i++) {
            if (tempTilesData[i].id == id) {
                target = i;
            }
        }
        tempTilesData[target].show = !tempTilesData[target].show;
        // tempTilesData.push(tempTilesData.splice(target,1)[0])
        setTilesData([...tempTilesData]);
    };

    useEffect(() => {
    }, [data, tilesData]);

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
                            // console.log("draged: ",positions);
                        }
                        // console.log(JSON.stringify(positions, null, 2))
                        // console.log(positions)
                    }
                >
                    {[...tilesData].map((tile, index) => (
                        // console.log("mapping"),
                        <Tile
                            key={index}
                            idx={data[`${tile.id}`] + 1}
                            id={tile.id}
                            onLongPress={() => true}
                            handler={props.modalHandler}
                            pushHandler={pushBackHandler}
                        />
                    ))}
                </SortableList>
                {props.scrollEnabledHandler && props.pageMoveHandler && (
                    <Button
                        title="저장"
                        titleStyle={{ color: "black" }}
                        buttonStyle={[
                            commonStyle.buttonStyle,
                            { minWidth: "25%" },
                        ]}
                        style={{ alignItems: "center" }}
                        onPress={() => {
                            console.log("저장");
                            console.log(tilesData);
                            if (
                                props.scrollEnabledHandler &&
                                props.pageMoveHandler
                            ) {
                                props.scrollEnabledHandler(true);
                                props.pageMoveHandler(4);
                            }
                        }}
                    ></Button>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default DragAndDrop;
