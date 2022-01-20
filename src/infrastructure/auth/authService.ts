import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutUser,
} from 'firebase/auth';
import { UserDto } from '../../types/auth/userDto';
import { auth } from '../core/initializeFirebase';
import { getUser } from './authRepository';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<UserDto | null> {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    return getUser(user.uid);
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function signOut(): Promise<void> {
  try {
    await signOutUser(auth);
  } catch (e) {
    console.log(e);
  }
}
