import { auth } from "../../firebase/firebase";
import { AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES } from "./auth.constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  UserCredential,
} from "firebase/auth";

interface AuthService {
  register(
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  logout(): Promise<void>;
}

class FirebaseAuthService implements AuthService {
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return userCredential;
    } catch (error: any) {
      switch (error.code) {
        case AUTH_ERROR_CODES.EMAIL_IN_USE:
          throw new Error(AUTH_ERROR_MESSAGES.EMAIL_IN_USE);
        case AUTH_ERROR_CODES.WEAK_PASSWORD:
          throw new Error(AUTH_ERROR_MESSAGES.WEAK_PASSWORD);
        case AUTH_ERROR_CODES.INVALID_EMAIL:
          throw new Error(AUTH_ERROR_MESSAGES.INVALID_EMAIL);
        default:
          throw new Error(AUTH_ERROR_MESSAGES.DEFAULT_REGISTER);
      }
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === AUTH_ERROR_CODES.INVALID_CREDENTIAL) {
        throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIAL);
      }
      throw new Error(AUTH_ERROR_MESSAGES.DEFAULT_LOGIN);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(AUTH_ERROR_MESSAGES.DEFAULT_LOGOUT);
    }
  }
}

export const authService = new FirebaseAuthService();
