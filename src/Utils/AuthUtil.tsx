import {auth} from '../fbase'

export const signInUtil = async (email: string,password: string) => {
    return await auth.signInWithEmailAndPassword(email,password);
}

export const signUpUtil = async (email: string,password: string) => {
    return await auth.createUserWithEmailAndPassword(email,password);
}

export const signOutUtil = async () => {
    return await auth.signOut();
}