import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login, registerGoogleAccount } from "./lib/actions/authActionServer";
import { getUserProfile } from "./lib/actions/userActionServer";

export class InvalidLoginError extends AuthError {
  constructor(public code: any, public details?: string) {
    super(details);
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as any;

          const response: any = await login({
            email,
            password,
            typeAccount: "credentials",
          });

          if (!response?.status) {
            throw new InvalidLoginError(response?.code, response?.message);
          }

          console.log(">>> response", response);

          return response?.result;
        } catch (error) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account?.provider === "google") {
        const response = await getUserProfile({
          email: profile?.email,
          typeAccount: "google",
        });

        // Nếu tài khoản chưa tồn tại thì tạo mới
        if (!response?.status) {
          await registerGoogleAccount({
            email: profile?.email,
            name: profile?.name,
            avatar: profile?.picture,
            typeAccount: "google",
            password: null,
          });
        }

        token.typeAccount = "google";
      } else if (account?.provider === "credentials") {
        token.typeAccount = "credentials";
      }

      // Lấy thông tin người dùng từ backend sau đó gán vào token
      const response = await getUserProfile({
        email: token?.email,
        typeAccount: account?.provider ?? token?.typeAccount,
      });

      // Gán thông tin người dùng vào token
      token.id = response?.result?.id;
      token.role = response?.result?.role;
      token.email = response?.result?.email;
      token.image = response?.result?.avatar;
      token.username = response?.result?.username;
      token.typeAccount = response?.result?.typeAccount;
      token.gender = response?.result?.gender;
      token.createdAt = response?.result?.createdAt;

      if (account?.provider === "credentials") {
        if (user?.accessToken && user?.refreshToken) {
          token.accessToken = user?.accessToken;
        }
      } else if (account?.provider === "google") {
        if (account?.access_token) {
          token.accessToken = account?.access_token;
        }
      }

      return token;
    },
    // nhận token từ jwt callback và trả về session
    async session({ session, token }: any) {
      session.user.id = token?.id ?? token?.sub;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      session.user.gender = token.gender;
      session.user.typeAccount = token.typeAccount;
      session.user.createdAt = token.createdAt;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
