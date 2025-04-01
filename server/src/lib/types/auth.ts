export type UserLogin = {
  email: string;
  password: string;
  typeAccount: string;
};

export type UserRegister = {
  email: string;
  name: string;
  password: string;
  typeAccount: "credentials" | "google";
  avatar: string;
};
