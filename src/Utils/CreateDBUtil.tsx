import { authService, dbService } from "../fbase";

// 다른 field들도 추가해야함
export const CreateDBUtil = async()=>{
    const uid = authService.currentUser!.uid;
    await dbService.collection('users').doc(`${uid}`).set({
        userName: authService.currentUser?.displayName,
    })
}