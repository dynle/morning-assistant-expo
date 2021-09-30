import { Alert } from "react-native";
import { authService, dbService, UserType, firebaseInstance } from "../fbase";
import { signOutUtil } from "./AuthUtil";

// TODO: 설정한 다른 field들도 추가해야함
export const DeleteUserUtil = async(user: UserType)=>{
    // TODO: use reauthenticate
    user.delete().then(async ()=>{
        console.log("user deleted")
        return await dbService.collection('users').doc(`${user.uid}`).delete();
    }).catch((error)=>{
        console.log(error)
        Alert.alert(error)
        return
    })
}