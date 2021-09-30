import { authService, dbService, UserType, firebaseInstance } from "../fbase";

// TODO: 설정한 다른 field들도 추가해야함
export const CreateDBUtil = async(user: UserType)=>{
    // const uid = authService.currentUser!.uid;
    await dbService.collection('users').doc(`${user.uid}`).set({
        userName: authService.currentUser?.displayName,
        created_at: firebaseInstance.firestore.Timestamp.now()
    })
}