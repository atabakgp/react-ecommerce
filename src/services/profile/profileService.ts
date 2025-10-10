// services/profileService.ts
import { auth } from "../../firebase/firebase";
import {
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  User,
} from "firebase/auth";
import { 
  PROFILE_ERROR_CODES,
  UpdateProfileParams,
  UpdateEmailParams,
  ChangePasswordParams,
  IProfileService
} from "./profile.types";

class ProfileService implements IProfileService {
  private getCurrentUser(): User {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is logged in");
    }
    return user;
  }

  private handleFirebaseError(error: any): never {
    const errorCode = error.code as string;
    
    switch (errorCode) {
      case PROFILE_ERROR_CODES.WRONG_PASSWORD:
        throw new Error("The current password you entered is incorrect.");
      case PROFILE_ERROR_CODES.REQUIRES_RECENT_LOGIN:
        throw new Error("Please log in again to confirm your identity.");
      case PROFILE_ERROR_CODES.TOO_MANY_REQUESTS:
        throw new Error("Too many failed attempts. Please wait a moment and try again.");
      case PROFILE_ERROR_CODES.USER_DISABLED:
        throw new Error("Your account has been disabled. Contact support.");
      case PROFILE_ERROR_CODES.USER_NOT_FOUND:
        throw new Error("User not found. Please check your credentials.");
      case PROFILE_ERROR_CODES.INVALID_CREDENTIAL:
        throw new Error("Invalid credentials. Please try again.");
      case PROFILE_ERROR_CODES.EMAIL_IN_USE:
        throw new Error("This email is already in use by another account.");
      case PROFILE_ERROR_CODES.INVALID_EMAIL:
        throw new Error("The email address is invalid.");
      default:
        throw new Error(error.message || "An unexpected error occurred. Please try again.");
    }
  }

  async updateUserProfile({ displayName, photoURL }: UpdateProfileParams): Promise<User> {
    try {
      const user = this.getCurrentUser();

      const updates: { displayName?: string; photoURL?: string } = {};
      
      if (displayName !== undefined) updates.displayName = displayName;
      if (photoURL !== undefined) updates.photoURL = photoURL;

      if (Object.keys(updates).length > 0) {
        await updateProfile(user, updates);
      }

      return user;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw this.handleFirebaseError(error);
    }
  }

  async updateUserEmail({ email }: UpdateEmailParams): Promise<User> {
    try {
      const user = this.getCurrentUser();
      await updateEmail(user, email);
      return user;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw this.handleFirebaseError(error);
    }
  }

  async changePassword({ 
    currentPassword, 
    newPassword 
  }: ChangePasswordParams): Promise<void> {
    try {
      const user = this.getCurrentUser();

      if (!user.email) {
        throw new Error("User email not found.");
      }

      const credential = EmailAuthProvider.credential(
        user.email, 
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw this.handleFirebaseError(error);
    }
  }
}

export const profileService = new ProfileService();