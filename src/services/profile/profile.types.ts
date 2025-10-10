// types/profile.types.ts
import { User } from "firebase/auth";

export const PROFILE_ERROR_CODES = {
  WRONG_PASSWORD: 'auth/wrong-password',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
} as const;

export interface UpdateProfileParams {
  displayName?: string;
  photoURL?: string;
}

export interface UpdateEmailParams {
  email: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface IProfileService {
  updateUserProfile(params: UpdateProfileParams): Promise<User>;
  updateUserEmail(params: UpdateEmailParams): Promise<User>;
  changePassword(params: ChangePasswordParams): Promise<void>;
}