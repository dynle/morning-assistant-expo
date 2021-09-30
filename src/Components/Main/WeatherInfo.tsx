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
import moment from "moment";
import { LineChart, XAxis } from "react-native-svg-charts";

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
    const [currPM10, setCurrPM10] = useState<number | null>(null);
    const [currWind, setCurrWind] = useState<number | null>(null);
    const [currUV, setCurrUV] = useState<number | null>(null);

    // const [hourData, setHourData] = useState<any>([]);
    const [hourDataTemp, setHourDataTemp] = useState<any>([]);
    const [hourDataTime, setHourDataTime] = useState<any>([]);
    const [hourDataImage, setHourDataImage] = useState<any>([]);

    async function getWeather(latitude: number, longitude: number) {
        const { data } = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&lang=ko&aqi=yes`
        );
        setCurrTemp(data.current.temp_c);
        setCurrStatus(data.current.condition.text);
        setCurrHumidity(data.current.humidity);
        setCurrPrecipitation(data.current.precip_mm);
        setCurrStatusImage(data.current.condition.icon);
        setCurrPM10(Math.round(data.current.air_quality.pm10));
        setCurrWind(data.current.wind_kph);
        setCurrUV(data.current.uv);
        // TODO:hourData는 왜 useState로 관리가 안될까?
        const hourData = data.forecast.forecastday[0].hour;
        var hourTempTemp: any = [];
        await hourData.map((dt: any) => {
            hourTempTemp.push([
                parseInt(dt.time.substring(11, 13)),
                dt.temp_c,
                dt.condition.icon,
            ]);
        });

        var hourDataTimetmp: any = hourTempTemp
            .map((item: any) => item[0])
            .filter((a: any, i: any) => i % 3 === 0);
        var hourDataTemptmp: any = hourTempTemp
            .map((item: any) => item[1])
            .filter((a: any, i: any) => i % 3 === 0);
        var hourDataImagetmp: any = hourTempTemp
            .map((item: any) => item[2])
            .filter((a: any, i: any) => i % 3 === 0);
        
        setHourDataTime(hourDataTimetmp);
        setHourDataTemp(hourDataTemptmp);
        setHourDataImage(hourDataImagetmp);
    }

    async function getGeolocation(latitude: number, longitude: number) {
        const { data } = await axios.get(
            `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${longitude},${latitude}&format=json&type=both&zipcode=true&simple=false&key=${VWORLD_API_KEY}`
        );
        setCurrLocation(data.response.result[0].structure.level4L);
        console.log(data.response.result[0].structure.level4L);
    }

    async function getWeatherLocation() {
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
        getWeatherLocation();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <View style={styles.container}>
                    <View style={styles.containerTop}>
                        <Text style={styles.containerTopText}>날씨</Text>
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
                                            width: RFPercentage(23),
                                            height: RFPercentage(23),
                                            marginTop: -RFPercentage(5),
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: RFPercentage(4),
                                            color: "white",
                                            marginTop:-RFPercentage(1)
                                        }}
                                    >
                                        {currLocation}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: RFPercentage(3),
                                            color: "gray",
                                            marginTop: RFPercentage(1),
                                        }}
                                    >
                                        {moment().format("dddd")}
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
                            {/* ////////////////////////////////line chart goes here///////////////////////////////////// */}
                            {(hourDataTemp != [] && hourDataTime != [] && hourDataImage != []) && (
                                <View style={{marginTop:RFPercentage(1)}}>
                                    <View
                                        style={{
                                            width: width * 0.8,
                                            height: height * 0.05,
                                            flexDirection: "column",
                                            // backgroundColor: "blue",
                                        }}
                                    >
                                        <XAxis
                                            data={hourDataTemp}
                                            svg={{
                                                fontSize: 10,
                                                fill: "white",
                                            }}
                                            formatLabel={(index: any) =>
                                                hourDataTemp[index] + "°"
                                            }
                                            contentInset={{
                                                left: RFPercentage(3),
                                                right: RFPercentage(3),
                                            }}
                                        />
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginHorizontal:RFPercentage(1.3)
                                            }}
                                        >
                                            {hourDataImage.map((item: any,index:number) => {
                                                return (
                                                    <Image
                                                        source={{
                                                            uri: `http:${item}`,
                                                        }}
                                                        style={{
                                                            width: RFPercentage(
                                                                3
                                                            ),
                                                            height: RFPercentage(
                                                                3
                                                            ),
                                                        }}
                                                        key={index}
                                                    ></Image>
                                                );
                                            })}
                                        </View>
                                    </View>
                                    <LineChart
                                        data={hourDataTemp}
                                        style={{
                                            height: height * 0.05,
                                            width: width * 0.8,
                                            // backgroundColor: "red",
                                        }}
                                        svg={{
                                            stroke: "white",
                                            strokeWidth: RFPercentage(0.5),
                                        }}
                                        contentInset={{ left: RFPercentage(3), right: RFPercentage(3) }}
                                    />
                                    <View
                                        style={{
                                            width: width * 0.8,
                                            height: height * 0.05,
                                            marginTop: RFPercentage(1),
                                            // backgroundColor: "blue",
                                        }}
                                    >
                                        <XAxis
                                            data={hourDataTime}
                                            svg={{
                                                fontSize: 10,
                                                fill: "white",
                                            }}
                                            formatLabel={(index: any) =>
                                                hourDataTime[index]+"시"
                                            }
                                            contentInset={{
                                                left: RFPercentage(3),
                                                right: RFPercentage(3),
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={styles.pm25Container}>
                            <View
                                style={[
                                    styles.currPM10Container,
                                    currPM10! > 50
                                        ? currPM10! > 100
                                            ? { backgroundColor: "#F5706D" }
                                            : { backgroundColor: "#FBB96E" }
                                        : currPM10! > 30
                                        ? { backgroundColor: "#9ED26D" }
                                        : { backgroundColor: "#94D3FF" },
                                ]}
                            >
                                <Text style={styles.currPM10Text}>
                                    {currPM10}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: RFPercentage(4),
                                        marginLeft: RFPercentage(2),
                                    }}
                                >
                                    미세먼지&nbsp;
                                    {(() => {
                                        if (currPM10! > 50) {
                                            if (currPM10! > 100)
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#F5706D",
                                                        }}
                                                    >
                                                        매우나쁨
                                                    </Text>
                                                );
                                            else
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#FBB96E",
                                                        }}
                                                    >
                                                        나쁨
                                                    </Text>
                                                );
                                        } else {
                                            if (currPM10! > 30)
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#9ED26D",
                                                        }}
                                                    >
                                                        보통
                                                    </Text>
                                                );
                                            else
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#94D3FF",
                                                        }}
                                                    >
                                                        좋음
                                                    </Text>
                                                );
                                        }
                                    })()}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.pm25Container}>
                            <View
                                style={[
                                    styles.currPM10Container,
                                    currUV! > 5
                                        ? currUV! > 7
                                            ? { backgroundColor: "#F5706D" }
                                            : { backgroundColor: "#FBB96E" }
                                        : currUV! > 2
                                        ? { backgroundColor: "#9ED26D" }
                                        : { backgroundColor: "#94D3FF" },
                                ]}
                            >
                                <Text style={styles.currPM10Text}>
                                    {currUV}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: RFPercentage(4),
                                        marginLeft: RFPercentage(2),
                                    }}
                                >
                                    UV&nbsp;
                                    {(() => {
                                        if (currUV! > 5) {
                                            if (currUV! > 7)
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#F5706D",
                                                        }}
                                                    >
                                                        아주높음
                                                    </Text>
                                                );
                                            else
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#FBB96E",
                                                        }}
                                                    >
                                                        높음
                                                    </Text>
                                                );
                                        } else {
                                            if (currUV! > 2)
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#9ED26D",
                                                        }}
                                                    >
                                                        보통
                                                    </Text>
                                                );
                                            else
                                                return (
                                                    <Text
                                                        style={{
                                                            color: "#94D3FF",
                                                        }}
                                                    >
                                                        낮음
                                                    </Text>
                                                );
                                        }
                                    })()}
                                </Text>
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
        alignItems: "flex-start",
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
    currPM10Container: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFPercentage(3),
    },
    currPM10Text: {
        fontSize: RFPercentage(9),
        fontWeight: "bold",
    },
    weatherinfosText: {
        fontSize: RFPercentage(3),
        color: "white",
        marginTop: RFPercentage(2),
    },
});
