import {authService} from '../fbase'

export const signInUtil = async (email: string,password: string) => {
    return await authService.signInWithEmailAndPassword(email,password);
}

export const signUpUtil = async (email: string,password: string) => {
    return await authService.createUserWithEmailAndPassword(email,password);
}

export const signOutUtil = async () => {
    return await authService.signOut();
}