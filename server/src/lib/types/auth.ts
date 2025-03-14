export type UserLogin = {
  email: string;
  password: string;
  typeAccount: string;
};

export type UserRegister = {
  email: string;
  password: string;
  typeAccount: "credentials" | "google";
  name: string;
  avatar: string;
};
