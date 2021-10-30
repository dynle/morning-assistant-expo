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
