import react from "react";
import { dbService, UserType } from "../fbase";

export async function FetchTodoList(user: UserType) {
    const colRef = dbService.collection(`users/${user.uid}/todoList`);
    const snapshot = await colRef.get();
    if (snapshot.empty) {
        return [];
    } else {
        return snapshot.docs.map((doc) => doc.data());
    }
}

export async function FetchAlarmList(user:UserType){
    const colRef = dbService.collection(`users/${user.uid}/alarmTime`);
    const snapshot = await colRef.get();
    if (snapshot.empty) {
        return [
            {
                key: 0,
                title: "월요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 1,
                title: "화요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 2,
                title: "수요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 3,
                title: "목요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 4,
                title: "금요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 5,
                title: "토요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
            {
                key: 6,
                title: "일요일",
                meridiem: "",
                hour: [0, 0],
                minutes: 0,
            },
        ];
    }else{
        return snapshot.docs.map((doc) => doc.data());
    }
}
