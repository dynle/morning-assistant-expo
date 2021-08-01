import { dbService } from "../fbase";
import { CreateDBUtil } from "./CreateDBUtil";

export default function checkDBUtil(uid: any, handler:(state:boolean)=>void){
    var docData = dbService
            .collection("users")
            .doc(`${uid}`);
    docData
        .get()
        .then((doc) => {
            if (!doc.exists) {
                CreateDBUtil();
                handler(true)
                console.log("New User");
            } else {
                handler(false);
                console.log("DB already existed");
            }
        })
        .catch((error) => {
            console.log("Error getting document: ", error);
        });
}