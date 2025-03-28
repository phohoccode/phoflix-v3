export type GetUserProfile = {
  email: string;
  typeAccount: "credentials" | "google";
}

export type UpdateUserProfile = {
  userId: string;
  username: string;
  gender: "other" | "female" | "male";
  avatar: string;
  typeAccount: "credentials" | "google";
};

export type UpdateUserPassword = {
  email: string;
  newPassword: string;
  oldPassword: string;
  typeAccount: "credentials";
};