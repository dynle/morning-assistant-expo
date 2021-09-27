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
    Alert,
    Platform,
    ImageSourcePropType,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { RFPercentage } from "react-native-responsive-fontsize";
import Loading from "../Common/LoadingComponent";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
// WeatherAPI from https://www.weatherapi.com/
const WEATHER_API_KEY = "5e12158714ad46c0aec72137212709";
// Geocoder from https://www.vworld.kr/dev/v4dv_geocoderguide2_s002.do
// 유효기간: 3 months, Until 2021/12/27
const VWORLD_API_KEY = "0DF83BDF-0DF7-3795-9928-441F5EB8FB6E";

export default function WeatherInfo() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currTemp, setCurrTemp] = useState<number | null>(null);
    const [currLocation, setCurrLocation] = useState<string | null>(null);
    const [currStatus, setCurrStatus] = useState<string | null>(null);
    const [currHumidity, setCurrHumidity] = useState<number | null>(null);
    const [currPrecipitation, setCurrPrecipitation] = useState<number | null>(
        null
    );
    const [currStatusImage, setCurrStatusImage] = useState<any>(null);
    const [currPM25, setCurrPM25] = useState<number | null>(null);
    const [currWind, setCurrWind] = useState<number | null>(null);
    const [currUV, setCurrUV] = useState<number | null>(null);

    async function getWeather(latitude: number, longitude: number) {
        const { data } = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&lang=ko&aqi=yes`
        );
        setCurrTemp(data.current.temp_c);
        setCurrStatus(data.current.condition.text);
        setCurrHumidity(data.current.humidity);
        setCurrPrecipitation(data.current.precip_mm);
        setCurrStatusImage(data.current.condition.icon);
        setCurrPM25(Math.round(data.current.air_quality.pm2_5));
        setCurrWind(data.current.wind_kph);
        setCurrUV(data.current.uv);
    }

    async function getGeolocation(latitude: number, longitude: number) {
        const { data } = await axios.get(
            `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${longitude},${latitude}&format=json&type=both&zipcode=true&simple=false&key=${VWORLD_API_KEY}`
        );
        setCurrLocation(data.response.result[0].structure.level4L);
        console.log(data.response.result[0].structure.level4L);
    }

    async function getLocation() {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            console.log(latitude, longitude);
            getWeather(latitude, longitude);
            getGeolocation(latitude, longitude);
            setIsLoading(false);
        } catch (error) {
            Alert.alert("위치를 찾을 수 없습니다.");
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getLocation();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <View style={styles.container}>
                    <View style={styles.containerTop}>
                        <Text style={styles.containerTopText}>
                            <Text>{currLocation}</Text>
                        </Text>
                    </View>
                    <View style={styles.containerBottom}>
                        <View style={styles.weatherContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.weatherContainerLeft}>
                                    <Image
                                        source={{
                                            uri: `http:${currStatusImage}`,
                                        }}
                                        style={{
                                            width: RFPercentage(25),
                                            height: RFPercentage(25),
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: RFPercentage(4),
                                            color: "gray",
                                        }}
                                    >
                                        {currStatus}
                                    </Text>
                                </View>
                                <View style={styles.weatherContainerRight}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.currTempText}>
                                            {currTemp}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.currTempText,
                                                { fontSize: RFPercentage(3) },
                                            ]}
                                        >
                                            °C
                                        </Text>
                                    </View>
                                    <Text style={styles.weatherinfosText}>
                                        강수량: {currPrecipitation} mm
                                    </Text>
                                    <Text style={styles.weatherinfosText}>
                                        습도: {currHumidity} %
                                    </Text>
                                    <Text style={styles.weatherinfosText}>
                                        바람: {currWind} kph
                                    </Text>
                                </View>
                            </View>
                            <View>
                                {/* ////////////////////////////////line chart goes here///////////////////////////////////// */}
                            </View>
                        </View>
                        <View style={styles.pm25Container}>
                            <View
                                style={[
                                    styles.currPM25Container,
                                    currPM25! > 20
                                        ? { backgroundColor: "#EACE6F" }
                                        : { backgroundColor: "#15B741" },
                                ]}
                            >
                                <Text style={styles.currPM25Text}>
                                    {currPM25}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ color: "white" }}>
                                    미세먼지 정보
                                </Text>
                            </View>
                        </View>
                        <View style={styles.pm25Container}>
                            <View
                                style={[
                                    styles.currPM25Container,
                                    currPM25! > 20
                                        ? { backgroundColor: "#EACE6F" }
                                        : { backgroundColor: "#15B741" },
                                ]}
                            >
                                <Text style={styles.currPM25Text}>
                                    {currUV}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ color: "white" }}>UV 정보</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        backgroundColor: "#4B4C4C",
    },
    containerTop: {
        flex: 1,
        width: width,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "green",
    },
    containerBottom: {
        flex: 5,
        width: width,
        alignItems: "center",
    },
    containerTopText: {
        color: "#E0DFD0",
        fontSize: RFPercentage(6),
    },
    weatherContainer: {
        backgroundColor: "#535351",
        width: width * 0.9,
        height: height * 0.4,
        alignItems: "center",
        borderRadius: RFPercentage(3),
        marginTop: RFPercentage(1),
    },
    weatherContainerLeft: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: width * 0.45,
    },
    weatherContainerRight: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: width * 0.45,
    },
    currTempText: {
        fontSize: RFPercentage(10),
        fontWeight: "bold",
    },
    pm25Container: {
        backgroundColor: "#535351",
        width: width * 0.9,
        height: height * 0.15,
        alignItems: "center",
        borderRadius: RFPercentage(3),
        marginTop: RFPercentage(1),
        flexDirection: "row",
    },
    currPM25Container: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFPercentage(3),
    },
    currPM25Text: {
        fontSize: RFPercentage(12),
        fontWeight: "bold",
    },
    weatherinfosText: {
        fontSize: RFPercentage(3),
        color: "white",
        marginTop: RFPercentage(2),
    },
});
