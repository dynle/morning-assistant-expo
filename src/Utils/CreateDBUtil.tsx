import { dbService, UserType, firebaseInstance } from "../fbase";
import { schedulePushNotification } from "../Utils/NotificationUtil";

// TODO: 설정한 다른 field들도 추가해야함
export const CreateDBUtil = async (user: UserType, settingData: any[]) => {
    const docRef = dbService.collection("users").doc(`${user.uid}`);
    const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    await docRef.set({
        userName: settingData[0],
        created_at: firebaseInstance.firestore.Timestamp.now(),
    });
    for (var i = 0; i < 7; i++) {
        await docRef.collection("alarmTime").doc(`${days[i]}`).set({
            key: settingData[1][i].key,
            title: settingData[1][i].title,
            meridiem: settingData[1][i].meridiem,
            hour: settingData[1][i].hour,
            minutes: settingData[1][i].minutes

            // original
            // hour: settingData[1][i].hour[1],
            // minutes: settingData[1][i].minutes,
        });
    }
    schedulePushNotification(settingData);
};

export const CreateTodoDBUtil = async (user: UserType,data:Array<any>) => {
    const docRef = dbService.collection("users").doc(`${user.uid}`);
    for (let i=0;i<data.length;i++){
        await docRef.collection("todoList").doc(`${data[i].title+data[i].time.toDate()}`).set({
            title: data[i].title,
            time: data[i].time.toDate(),
            color: data[i].color
        });
    }
}

export const CreateShareDBUtil = () => {
    
}