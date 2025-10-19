import { auth } from "../../firebase/firebase";
import { AUTH_ERROR_CODES } from "./auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  UserCredential
} from "firebase/auth";

interface AuthService {
  register(email: string, password: string, name: string): Promise<UserCredential>;
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
      console.error("Registration error:", error.code);
      
      switch (error.code) {
        case AUTH_ERROR_CODES.EMAIL_IN_USE:
          throw new Error(
            "This email is already registered. Please use a different email."
          );
        case AUTH_ERROR_CODES.WEAK_PASSWORD:
          throw new Error(
            "Password is too weak. Please use a stronger password."
          );
        case AUTH_ERROR_CODES.INVALID_EMAIL:
          throw new Error(
            "Please provide a valid email address."
          );
        default:
          throw new Error(
            error.code,
            error.message || "An error occurred during registration."
          );
      }
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login error:", error.code);
      
      if (error.code === AUTH_ERROR_CODES.INVALID_CREDENTIAL) {
        throw new Error("Incorrect email or password");
      }
      throw new Error(
        error.code,
        error.message || "An error occurred during login."
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(
        "An error occurred during logout."
      );
    }
  }
}

export const authService = new FirebaseAuthService();