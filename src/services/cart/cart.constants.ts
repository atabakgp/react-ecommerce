export const CART_ERROR_CODES = {
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  NOT_FOUND: "not-found",
  NETWORK_ERROR: "unavailable",
} as const;

export const CART_ERROR_MESSAGES = {
  PERMISSION_DENIED: "You don't have permission to modify the cart.",
  UNAUTHENTICATED: "You must be signed in to access your cart.",
  NOT_FOUND: "Cart data not found for this user.",
  NETWORK_ERROR:
    "Network error occurred. Please check your internet connection.",
  DEFAULT_SAVE: "An error occurred while saving your cart.",
  DEFAULT_LOAD: "An error occurred while loading your cart.",
} as const;
