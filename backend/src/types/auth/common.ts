export type AuthResult =
  | { success: true; access_token: string }
  | { success: false; error: string };
