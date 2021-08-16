import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import HomeScreen from "../../Screens/HomeScreen";
import Carousel from "react-native-snap-carousel";
import { commonStyle } from "../../Styles/CommonStyles";

const carouselItems = [
    {
        title: "Item 1",
        text: "Text 1",
    },
    {
        title: "Item 2",
        text: "Text 2",
    },
    {
        title: "Item 3",
        text: "Text 3",
    },
    {
        title: "Item 4",
        text: "Text 4",
    },
    {
        title: "Item 5",
        text: "Text 5",
    },
];

export default function Setting5ConfirmSlide(props: {
    pageMoveHandler: (pageNumber: number) => void;
}) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const ref = useRef(null);

    const _renderItem = useCallback((props: { item: any; index: number }) => {
        return (
            <View
                style={{
                    backgroundColor: "#C4C4C4",
                    borderRadius: 5,
                    height: "90%",
                    padding: "10%",
                    marginLeft: 25,
                    marginRight: 25,
                }}
            >
                <Text style={{ fontSize: 30 }}>{props.item.title}</Text>
                <Text>{props.item.text}</Text>
            </View>
        );
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.containerTitleText}>슬라이드 확인</Text>
            </View>
            <View style={styles.containerMiddle}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: "#222222",
                        paddingTop: 50,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Carousel
                            layout={"default"}
                            ref={ref}
                            data={carouselItems}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={_renderItem}
                            onSnapToItem={(index:number) => setActiveIndex(index)}
                            useScrollView={true}
                        />
                    </View>
                </SafeAreaView>
            </View>
            <View style={styles.containerRemainer}>
                <Button
                    title="재설정"
                    titleStyle={{ color: "black" }}
                    buttonStyle={commonStyle.buttonStyle}
                    style={{ alignItems: "center" }}
                    onPress={() => {
                        props.pageMoveHandler(3);
                    }}
                ></Button>
                <Button
                    title="확인"
                    titleStyle={{ color: "black" }}
                    buttonStyle={commonStyle.buttonStyle}
                    style={{ alignItems: "center" }}
                    onPress={() => {
                        props.pageMoveHandler(5);
                    }}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E2D3C1",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: "row",
    },
    containerMiddle: {
        flex: 4.5,
        width: Dimensions.get("window").width,
    },
    containerRemainer: {
        flex: 1,
    },
    containerTitleText: {
        fontSize: 30,
    },
});
