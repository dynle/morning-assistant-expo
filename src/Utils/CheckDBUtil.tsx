import { dbService, UserType } from "../fbase";

export default function CheckDBUtil(
    user: UserType,
    handler: (state: boolean) => void
) {
    var docData = dbService.collection("users").doc(`${user.uid}`);
    docData
        .get()
        .then((doc) => {
            if (!doc.exists) {
                handler(true);
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
