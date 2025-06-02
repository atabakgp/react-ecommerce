// src/services/authServices.ts
import { auth } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";


// Register new user with error handling
export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update display name
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    return userCredential;
  } catch (error: any) {
    // Firebase error handling
    console.error("Error code:", error.code);
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "This email is already registered. Please use a different email."
      );
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Password is too weak. Please use a stronger password.");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Please provide a valid email address.");
    }
    throw new Error(error.message || "An error occurred during registration.");
  }
};

// Login existing user with error handling
export const loginUser = async (
  email: string,
  password: string,
  setLoading: (val: boolean) => void
) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    // Firebase error handling
    console.error("Error code:", error.code);
    if (error.code === "auth/invalid-credential") {
      throw new Error("Incorrect email or password");
    }
    throw new Error(error.message || "An error occurred during login.");
  } finally {
    setLoading(false);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error("An error occurred during logout.");
  }
};
