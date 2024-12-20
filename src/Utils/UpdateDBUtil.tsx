import { Alert } from "react-native";
import { authService, dbService, UserType, firebaseInstance } from "../fbase";
import { schedulePushNotification } from "../Utils/NotificationUtil";

export const UpdateAlarmDBUtil = async (
    user: UserType,
    _settingData: any[]
) => {
    const docRef = dbService.collection("users").doc(`${user.uid}`);
    const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    const settingData = [null, _settingData];
    for (var i = 0; i < 7; i++) {
        await docRef.collection("alarmTime").doc(`${days[i]}`).set({
            key: settingData[1]![i].key,
            title: settingData[1]![i].title,
            meridiem: settingData[1]![i].meridiem,
            hour: settingData[1]![i].hour,
            minutes: settingData[1]![i].minutes,

            // original
            // hour: settingData[1]![i].hour[1],
            // minutes: settingData[1]![i].minutes,
        });
    }
    schedulePushNotification(settingData);
};

export const ChangeNameDBUtil = (user: UserType) => {
    var docRef = dbService.collection("users").doc(`${user.uid}`);
    let docData:any;
    
    docRef.get().then((doc)=>{
        if(doc.exists){
            docData = doc.data();
        }
    }).then(()=>{
        Alert.prompt(
            "새로운 이름을 입력해 주세요.",
            `현재 이름: ${docData.userName}`,
            // undefined,
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "확인",
                    onPress: (newName) => UpdateUserNameDBUtil(user, newName),
                },
            ]
        );
    })

    
};

const UpdateUserNameDBUtil = async (
    user: UserType,
    newName: string | undefined
) => {
    await dbService
        .collection("users")
        .doc(`${user.uid}`)
        .update({
            userName: newName,
        })
        .then(() => {
            console.log("user name successfully updated");
        });
    Alert.alert("업데이트 완료");
};
