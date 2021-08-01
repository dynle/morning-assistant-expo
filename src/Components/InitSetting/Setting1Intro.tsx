import React, {useRef} from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { Button } from "react-native-elements";
import { TextStroke } from "../../Styles/TextStroke";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function Setting1Intro() {
    return (
        // IDEA: fade in effect를 주면 좋음
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <TextStroke stroke={1} color={"black"}>
                    <Text style={styles.containerText}>당신의 아침을 위해</Text>
                </TextStroke>
            </View>
            <View style={styles.containerBottom}>
                <TextStroke stroke={1} color={"black"}>
                    <Text style={styles.containerText}>당신의 하루를</Text>
                    <Text style={styles.containerText}>이야기 해주세요</Text>
                </TextStroke>
                {/* IDEA: 슬라이드 아이콘에 애니메이션 추가하면 좋을 듯 */}
                <View style={styles.swipeIcon}>
                    <Icon
                        type="material-community"
                        name="gesture-swipe-left"
                        size={100}
                        color='#C6BF9F'
                    ></Icon>
                    {/* <Text style={styles.swipeIconText}>SWIPE</Text> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222323",
        width: Dimensions.get("window").width,
        // justifyContent: "center",
        // alignItems: "center",
    },
    containerTop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerBottom: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    containerText: {
        color: "#C6BF9F",
        fontSize: 40,
        // fontWeight: "bold",
        textAlign: "center",
    },
    swipeIcon: {
        paddingTop: 80,
        flexDirection:'row',
        alignItems: 'center'
    },
    // swipeIconText: {
    //     color: '#C6BF9F',
    //     fontSize:40
    // }
});
