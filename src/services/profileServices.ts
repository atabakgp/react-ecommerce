import { auth } from "../firebase/firebase";
import {
  updateProfile,
  sendEmailVerification,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword
} from "firebase/auth";
import { UserProfile } from "../types/profile";

export async function updateUserProfile(name: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is logged in");

  if (name) {
    await updateProfile(user, { displayName: name });
  }

  return user;
}

export async function updateUserEmail(email: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is logged in");
  await updateEmail(user, email);
  return user;
}




export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("No authenticated user found.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (error: any) {
    switch (error.code) {
      case "auth/wrong-password":
        throw new Error("The current password you entered is incorrect.");
      case "auth/requires-recent-login":
        throw new Error("Please log in again to confirm your identity.");
      case "auth/too-many-requests":
        throw new Error("Too many failed attempts. Please wait a moment and try again.");
      case "auth/user-disabled":
        throw new Error("Your account has been disabled. Contact support.");
      case "auth/user-not-found":
        throw new Error("User not found. Please check your credentials.");
      case "auth/invalid-credential":
        throw new Error("Invalid credentials. Please try again.");
      default:
        throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}
