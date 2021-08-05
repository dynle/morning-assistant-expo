import { dbService, UserType} from "../fbase";
import { CreateDBUtil } from "./CreateDBUtil";

export default function CheckDBUtil(user: UserType, handler:(state:boolean)=>void){
    var docData = dbService
            .collection("users")
            .doc(`${user.uid}`);
    // TODO: 처음 설정하는 도중 앱을 나가도 DB는 만들어 지는 케이스가 생김. 설정 스크린에서 완료 버튼을 눌러야 DB가 생기도록
    docData
        .get()
        .then(async (doc) => {
            if (!doc.exists) {
                await CreateDBUtil(user);
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