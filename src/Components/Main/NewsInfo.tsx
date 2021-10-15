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

const NEWS_API_KEY="ce11f62112a54f498829359cbbb87e6d";

export default function NewsInfo() {
    async function getNews(){
        const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${NEWS_API_KEY}`
        );
        console.log(data);
    }

    useEffect(()=>{
        getNews();
    },[])
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>NewsInfo</Text>
        </View>
    );
}
