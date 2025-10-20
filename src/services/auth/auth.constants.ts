export const AUTH_ERROR_CODES = {
  EMAIL_IN_USE: "auth/email-already-in-use",
  WEAK_PASSWORD: "auth/weak-password",
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_CREDENTIAL: "auth/invalid-credential",
} as const;

export const AUTH_ERROR_MESSAGES = {
  EMAIL_IN_USE:
    "This email is already registered. Please use a different email.",
  WEAK_PASSWORD: "Password is too weak. Please use a stronger password.",
  INVALID_EMAIL: "Please provide a valid email address.",
  INVALID_CREDENTIAL: "Incorrect email or password",
  DEFAULT_REGISTER: "An error occurred during registration.",
  DEFAULT_LOGIN: "An error occurred during login.",
  DEFAULT_LOGOUT: "An error occurred during logout.",
} as const;
