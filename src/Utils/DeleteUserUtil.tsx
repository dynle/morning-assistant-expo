import { Alert } from "react-native";
import { authService, dbService, UserType, firebaseInstance } from "../fbase";
import { signOutUtil } from "./AuthUtil";

// TODO: 설정한 다른 field들도 추가해야함
export const DeleteUserUtil = async(user: UserType)=>{
    // TODO: use reauthenticate
    // TODO: 로그아웃하고 게정삭제하면 계정삭제는 되지만 DB는 삭제가 안됨.
    const userUidTmp = user.uid
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