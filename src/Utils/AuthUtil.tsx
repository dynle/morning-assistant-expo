import {authService, dbService} from '../fbase'

export const signInUtil = async (email: string,password: string) => {
    return await authService.signInWithEmailAndPassword(email,password);
}

export const signUpUtil = async (email: string,password: string) => {
    const credentials = await authService.createUserWithEmailAndPassword(email,password);
    return credentials;
}

export const signOutUtil = async () => {
    return await authService.signOut();
}