import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export async function registerNotificationUtil() {
        let token: string;
        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync({
                    ios:{
                        allowAlert: true,
                        allowBadge: true,
                        allowSound: true,
                        allowAnnouncements: true
                    }
                });
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("in NotificationUtil: ",token);
        } else {
            alert("Must use physical device for Push Notifications");
        }
    
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
}

export async function schedulePushNotification(settingData:any){
    // for android: WeeklyTriggerInput / getNotificationChannelAsync, for ios: calendarTriggerInput
    // if(Platform.OS === 'ios'){
    // }else{}

    // var scheduleTime = new Date();
    for(var i=0;i<7;i++){
        // scheduleTime.setHours(settingData[1][i].hour[1]);
        // scheduleTime.setMinutes(settingData[1][i].minutes);
        // scheduleTime.setSeconds(0);
        if(i!=6){
            await Notifications.scheduleNotificationAsync({
                content:{
                    title: "오늘의 아침을 확인하세요!",
                    body: "클릭해서 정보를 받아보세요.",
                },
                trigger:{
                    repeats: true,
                    weekday: i+2,
                    hour: settingData[1][i].hour[1],
                    minute: settingData[1][i].minutes,
                }
            })
        }else{
            await Notifications.scheduleNotificationAsync({
                content:{
                    title: "오늘의 아침을 확인하세요!",
                    body: "클릭해서 정보를 받아보세요.",
                },
                trigger:{
                    repeats:true,
                    weekday: 1,
                    hour: settingData[1][i].hour[1],
                    minute: settingData[1][i].minutes,
                }
            })
        }
    }
}

export async function cancelAllScheduledPushNotification(){
    await Notifications.cancelAllScheduledNotificationsAsync();
}