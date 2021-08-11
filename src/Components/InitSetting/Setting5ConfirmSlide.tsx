import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import HomeScreen from "../../Screens/HomeScreen";
import { signOutUtil } from "../../Utils/AuthUtil";
import Carousel from "react-native-snap-carousel";

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

export default function Setting5ConfirmSlide() {
    const [activeIndex, setActiveIndex] = useState(0);

    // const isCarousel = useRef(null);
    let _carousel: Carousel<any> | null | object = {};

    const _renderItem = (props: { item: any; index: number }) => {
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.containerTitleText}>슬라이드 확인</Text>
            </View>
            <View style={styles.containerRemainer}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: "rebeccapurple",
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
                            ref={(c) => {
                                _carousel = c;
                            }}
                            data={carouselItems}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={_renderItem}
                            onSnapToItem={(index) => setActiveIndex(index)}
                            useScrollView={true}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6EBCE",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    containerRemainer: {
        flex: 3.5,
        width: Dimensions.get("window").width,
    },
    containerTitleText: {
        fontSize: 30,
    },
});
