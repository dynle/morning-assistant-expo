import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { MainScreenStyles } from "../../Styles/MainScreenStyles";
import moment from "moment";
import { RFPercentage } from "react-native-responsive-fontsize";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const NEWS_API_KEY = "ce11f62112a54f498829359cbbb87e6d";

const _renderItem = (_props: { item: any }) => {
    return (
        <TouchableOpacity style={styles.containerButton} activeOpacity={0.8}>
            <View style={styles.buttonContent}>
                <View style={[styles.iconStyle, { alignSelf:'center'}]}>
                    <Image
                        source={{uri: _props.item.image}}
                        style={{width:'100%',height:'75%'}}
                    ></Image>
                </View>
                <View style={{marginLeft:RFPercentage(1)}}>
                    <Text style={{color:'#d9d9db',marginTop:RFPercentage(0.5),marginBottom:RFPercentage(1)}}>{_props.item.website} | {_props.item.date} {_props.item.time}</Text>
                    <Text numberOfLines={2} style={{color:'white',fontSize:RFPercentage(2.5,), marginBottom:RFPercentage(1),width:'55%'}}>{_props.item.title} ...</Text>
                    <Text numberOfLines={2} style={{color:'#d9d9db',fontSize:RFPercentage(2.5),width:'55%'}}>{_props.item.des} ...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function NewsInfo() {
    const [newsList, SetNewsList] = useState<Array<any>>([]);

    async function getNews() {
        const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${NEWS_API_KEY}`
        );
        let _newsList= new Array(10);
        for (let i = 0; i < 10; i++) {
            _newsList[i] = {
                key: i.toString(),
                website: data.articles[i].source.name,
                title: data.articles[i].title.substring(0,30),
                des: data.articles[i].description.substring(0,30),
                url: data.articles[i].url,
                image: data.articles[i].urlToImage,
                date: data.articles[i].publishedAt.substring(5,10),
                time: data.articles[i].publishedAt.substring(11,16)
            };
        }
        SetNewsList(_newsList)
        console.log(newsList);
    }

    useEffect(() => {
        // enable below code to fetch news data from newsapi.com
        // getNews();
        console.log("refreshed");
    }, []);
    return (
        <View
            style={[MainScreenStyles.container, { backgroundColor: "#CCC0B8" }]}
        >
            <View style={[MainScreenStyles.containerTop, {}]}>
                <Text style={[MainScreenStyles.containerTopText, {}]}>
                    헤드라인 뉴스
                </Text>
            </View>
            <View style={MainScreenStyles.containerBottom}>
                <Text style={styles.dayofweekText}>
                    {moment().format("dddd")}
                </Text>
                <FlatList
                    data={newsList}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.key}
                    scrollEnabled={true}
                    contentContainerStyle={{ marginTop: RFPercentage(2) }}
                ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dayofweekText: {
        color: "#7D773D",
        fontSize: RFPercentage(5),
        marginTop: RFPercentage(3),
    },

    containerButton: {
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.95,
        height: Dimensions.get("window").height * 0.15,
        alignItems: "flex-start",
        backgroundColor: "#434149",
        borderRadius: 10,
        marginBottom: "1%",
    },
    buttonContent: {
        flexDirection: "row",
        height: "100%",
    },
    iconStyle: {
        height: "90%",
        width: "35%",
        marginLeft: "2%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
