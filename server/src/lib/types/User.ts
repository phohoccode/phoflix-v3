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

export type CreateReportMovie = {
  userId: string;
  movieSlug: string;
  description: string;
  title: string;
  movieName: string;
}