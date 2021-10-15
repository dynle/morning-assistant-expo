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
            hour: settingData[1][i].hour[1],
            minutes: settingData[1][i].minutes,
        });
    }
    schedulePushNotification(settingData);
};

export const CreateTodoDBUtil = () => {
    
}

export const CreateShareDBUtil = () => {
    
}