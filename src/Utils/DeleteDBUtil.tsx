import { Alert } from "react-native";
import { authService, dbService, UserType, firebaseInstance } from "../fbase";
import { signOutUtil } from "./AuthUtil";

// TODO: 설정한 다른 field들도 추가해야함
export const DeleteUserUtil = async(user: UserType)=>{
    // TODO: use reauthenticate
    const userUidTmp = user.uid
    // TODO: 로그아웃하고 게정삭제하면 계정삭제는 되지만 DB는 삭제가 안됨.
    user.delete().then(async ()=>{
        console.log("user deleted")
        dbService.collection('users').doc(`${userUidTmp}`).delete().then(()=>{
            console.log("user document successfully deleted");
        }).catch((error)=>{
            console.error("Error removing document: ",error);
        })
    }).catch((error)=>{
        console.log(error)
        Alert.alert(error)
    })
}

export const DeleteTodoUtil = (user:UserType, data:any)=>{
    const colRef = dbService.collection(`users/${user.uid}/todoList`);
    colRef.doc(`${data.title+data.time.toDate()}`).delete().then(()=>{
        console.log("Document successfully deleted.");
    }).catch((error)=>{
        console.log("Error removing document: ",error);
    })
}