import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    Alert,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { UserType } from "../../fbase";
import { commonStyle } from "../../Styles/CommonStyles";
import {
    homescreenStyle,
    BackgroundCircle,
} from "../../Styles/HomeScreenStyle";
import { modalStyle } from "../../Styles/ModalStyle";
import { CreateTodoDBUtil } from "../../Utils/CreateDBUtil";
import { DeleteTodoUtil } from "../../Utils/DeleteDBUtil";
import { FetchTodoList } from "../../Utils/FetchDBUtil";
import LoadingComponent from "../Common/LoadingComponent";

interface TodoDataType {
    title: string;
    time: any;
    color: string;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// temp variables
let clock_height = RFPercentage(20);
let clock_width = RFPercentage(20);

// dummy data
// let todoData = [];

const colors1 = ["#6C95D6", "#5AA7AA", "#D66B6B", "#D6D16B"];
const colors2 = ["#D66BAC", "#88C778", "#A06BD6", "#D59E6B"];

export default function MenuTodo(props: { user: UserType; navigation: any }) {
    const [todoList, setTodoList] = useState<TodoDataType[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [newTodoTime, setNewTodoTime] = useState<any>(0);
    const [todoColor, setTodoColor] = useState<string>("#6C95D6");
    const [spinnerTime, setSpinnerTime] = useState(new Date());
    const [isLoading, SetIsLoading] = useState(true);

    const AsyncAlert = async (message: string) =>
        new Promise((resolve) => {
            Alert.alert(
                message,
                "",
                [
                    {
                        text: "확인",
                        onPress: () => {
                            resolve("YES");
                        },
                    },
                ],
                { cancelable: false }
            );
        });

    const onTimeChange = (event: any, selectedTime: Date | undefined) => {
        const currTime = selectedTime || spinnerTime;
        // IDEA: firebase에 저장할때는 9시간 더해서 저장해야함
        setSpinnerTime(currTime);
        var convertedTime = moment(currTime).add(1, "days");
        setNewTodoTime(convertedTime);
    };

    const _renderItem = (_props: { item: any }) => {
        let _time = moment(_props.item.time.toDate()).format("a h:mm");

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    backgroundColor: _props.item.color,
                    width: width * 0.8,
                    height: height * 0.12,
                    borderRadius: RFPercentage(2),
                    // justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: 5,
                    flexDirection: "row",
                }}
                onPress={() => deleteElement(_props.item)}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: "white",
                        fontSize: RFPercentage(4),
                        marginLeft: RFPercentage(2),
                    }}
                >
                    {/* TODO: title이 길어기면 ... 추가하기 or 2번째 라인으로 바꾸기*/}
                    {_props.item.title}
                </Text>
                <Text
                    style={{
                        color: "white",
                        fontSize: RFPercentage(3),
                        marginLeft: "auto",
                        marginRight: RFPercentage(2),
                    }}
                >
                    {_time}
                </Text>
            </TouchableOpacity>
        );
    };

    const addElement = (title: string, time: any, color: string) => {
        var newList = [...todoList, { title: title, time: time, color: color }];
        setTodoList(newList);
    };

    const deleteElement = (item: any) => {
        Alert.alert("일정 삭제", "일정을 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            { text: "삭제", onPress: () => deleteElementDetailed(item) },
        ]);
    };

    const deleteElementDetailed = (item: any) => {
        var newList = todoList.filter(function (it) {
            return it !== item;
        });
        setTodoList(newList);
        DeleteTodoUtil(props.user, item);
        Alert.alert("삭제 되었습니다.");
    };

    useEffect(() => {
        const FetchTodo = async () => {
            const todoData: any = await FetchTodoList(props.user);
            console.log("todoData: ", todoData);
            setTodoList(todoData);
            SetIsLoading(false);
        };
        FetchTodo();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <View style={homescreenStyle.container}>
                    <BackgroundCircle />

                    {/* Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={modalStyle.centeredView}>
                            <View style={modalStyle.modalView}>
                                <Icon
                                    type="material-community"
                                    name="close"
                                    size={RFPercentage(5)}
                                    containerStyle={styles.iconContainer}
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                ></Icon>
                                <Text
                                    style={{
                                        marginBottom: RFPercentage(3),
                                        fontSize: RFPercentage(6),
                                    }}
                                >
                                    일정 추가
                                </Text>
                                <Input
                                    placeholder="일정을 입력하세요."
                                    placeholderTextColor={"white"}
                                    style={{
                                        color: "white",
                                        backgroundColor: todoColor,
                                        padding: RFPercentage(3),
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={setNewTodoTitle}
                                ></Input>
                                <View
                                    style={{
                                        backgroundColor: "#DDDDDD",
                                        width: RFPercentage(40),
                                        height: RFPercentage(35),
                                        borderRadius: RFPercentage(4),
                                        justifyContent: "center",
                                        marginBottom: RFPercentage(1),
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: RFPercentage(4),
                                        }}
                                    >
                                        시간 입력
                                    </Text>
                                    <RNDateTimePicker
                                        textColor="black"
                                        value={spinnerTime}
                                        display="spinner"
                                        mode="time"
                                        minuteInterval={5}
                                        onChange={onTimeChange}
                                        style={{ height: RFPercentage(30) }}
                                    />
                                </View>
                                <View style={styles.colorPaletteContainer}>
                                    {colors1.map((value, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.colorContainer,
                                                { backgroundColor: value },
                                            ]}
                                            onPress={() => setTodoColor(value)}
                                        ></TouchableOpacity>
                                    ))}
                                </View>
                                <View style={styles.colorPaletteContainer}>
                                    {colors2.map((value, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.colorContainer,
                                                { backgroundColor: value },
                                            ]}
                                            onPress={() => setTodoColor(value)}
                                        ></TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableHighlight
                                    style={[
                                        modalStyle.modalButton,
                                        { marginTop: RFPercentage(1) },
                                    ]}
                                    onPress={async () => {
                                        if (
                                            newTodoTitle.length == 0 ||
                                            newTodoTime == 0
                                        ) {
                                            await AsyncAlert(
                                                "일정 및 시간을 입력해 주세요."
                                            );
                                        } else {
                                            addElement(
                                                newTodoTitle,
                                                newTodoTime,
                                                todoColor
                                            );
                                            await AsyncAlert(
                                                "저장을 눌러서 저장하세요."
                                            );
                                            setModalVisible(!modalVisible);
                                            setNewTodoTitle("");
                                            setNewTodoTime(0);
                                            setTodoColor("#6C95D6");
                                        }
                                    }}
                                >
                                    <Text style={{ fontSize: RFPercentage(3) }}>
                                        저장
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <View style={homescreenStyle.containerTop}>
                        <Text
                            style={[
                                homescreenStyle.containerTopText,
                                homescreenStyle.containerTopTextS,
                            ]}
                        >
                            일정
                        </Text>
                    </View>
                    <View style={homescreenStyle.containerBottom}>
                        <View style={homescreenStyle.containerBottomFig}>
                            <View style={styles.containerFig}></View>
                            <Text style={styles.dayOfWeekStyle}>
                                {moment().add(1, "days").format("dddd")}
                            </Text>
                        </View>
                        <View style={homescreenStyle.containerBottomMid}>
                            <View style={{ flex: 2 }}>
                                {todoList.length === 0 ? (
                                    <View>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: RFPercentage(3),
                                                top: RFPercentage(10),
                                            }}
                                        >
                                            일정이 없습니다.
                                        </Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={todoList.sort(
                                            (a, b) => a.time - b.time
                                        )}
                                        renderItem={_renderItem}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                        scrollEnabled={true}
                                        showsVerticalScrollIndicator={false}
                                    ></FlatList>
                                )}
                            </View>
                            <View
                                style={{ flex: 0.5, justifyContent: "center" }}
                            >
                                <Button
                                    icon={{
                                        name: "add",
                                        size: RFPercentage(5),
                                    }}
                                    buttonStyle={{
                                        width: width * 0.17,
                                        height: height * 0.075,
                                        borderRadius: RFPercentage(3),
                                        backgroundColor: "#F2EDE1",
                                        marginTop: RFPercentage(3),
                                    }}
                                    // onPress={addElement}
                                    onPress={() => {
                                        setModalVisible(true);
                                    }}
                                ></Button>
                            </View>
                        </View>
                        <View style={homescreenStyle.containerBottomButton}>
                            <Button
                                title="저장"
                                titleStyle={{ color: "black" }}
                                buttonStyle={commonStyle.buttonStyle}
                                onPress={() => {
                                    Alert.alert(
                                        "일정 저장",
                                        "일정을 저장하시겠습니까?",
                                        [
                                            { text: "취소", style: "cancel" },
                                            {
                                                text: "확인",
                                                onPress: async () => {
                                                    SetIsLoading(true);
                                                    await CreateTodoDBUtil(
                                                        props.user,
                                                        todoList
                                                    );
                                                    SetIsLoading(false);
                                                    Alert.alert(
                                                        "저장되었습니다."
                                                        );
                                                    props.navigation.goBack();
                                                },
                                            },
                                        ]
                                    );
                                }}
                            ></Button>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    containerFig: {
        height: clock_height,
        width: clock_width,
        borderRadius: clock_height / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C4C4C4",
        shadowColor: "#C4C4C4",
        shadowOpacity: 10,
        shadowRadius: 15,
    },
    dayOfWeekStyle: {
        textAlign: "center",
        color: "#DFCA96",
        fontSize: RFPercentage(4),
        marginTop: "5%",
    },
    iconContainer: {
        width: 40,
        height: 40,
        position: "absolute",
        backgroundColor: "#F3EDE1",
        borderRadius: RFPercentage(10),
        justifyContent: "center",
        alignItems: "center",
        right: "-1%",
        top: "-1%",
    },
    colorPaletteContainer: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: RFPercentage(0.3),
    },
    colorContainer: {
        width: RFPercentage(8),
        height: RFPercentage(8),
        borderRadius: RFPercentage(100),
    },
});
