import { Alert } from "react-native";
import { authService, dbService, UserType, firebaseInstance } from "../fbase";
import { schedulePushNotification } from "../Utils/NotificationUtil";

export const UpdateAlarmDBUtil = async (user: UserType, _settingData: any[]) => {
    const docRef = dbService.collection("users").doc(`${user.uid}`);
    const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    const settingData = [null,_settingData];
    for (var i = 0; i < 7; i++) {
        await docRef.collection("alarmTime").doc(`${days[i]}`).set({
            hour: settingData[1]![i].hour[1],
            minutes: settingData[1]![i].minutes,
        });
    }
    schedulePushNotification(settingData);
};

export const ChangeNameDBUtil = (user:UserType) => {
    Alert.prompt(
        "새로운 이름을 입력해 주세요.",
        undefined,
        [
            {
                text:"취소",
                style:"cancel"
            },
            {
                text:"확인",
                onPress: newName=>UpdateUserNameDBUtil(user,newName)
            }
        ]
    )
}

const UpdateUserNameDBUtil = async (user: UserType,newName:string | undefined)=>{
    await dbService.collection("users").doc(`${user.uid}`).update({
        userName: newName
    }).then(()=>{
        console.log("user name successfully updated");
    })
    Alert.alert("업데이트 완료");
}