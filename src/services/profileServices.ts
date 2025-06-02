import { auth } from "../firebase/firebase";
import {
  updateProfile,
  sendEmailVerification,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
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
  await sendEmailVerification(user);
  // await updateEmail(user, email);
  return user;
}
