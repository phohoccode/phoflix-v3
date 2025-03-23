import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

          const response: any = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                typeAccount: "credentials",
              }),
            }
          );

          const data = await response.json();

          if (!data?.status) {
            throw new InvalidLoginError(data?.code, data?.message);
          }

          return data?.result;
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
    async jwt({ token, profile, account }: any) {
      if (account?.provider === "google") {
        // Gọi api kiểm tra tài khoản đã tồn tại chưa
        const query = `email=${profile?.email}&typeAccount=google`;

        const response: any = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile?${query}`
        );

        const data = await response.json();

        // Nếu tài khoản chưa tồn tại thì tạo mới
        if (!data?.status) {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile?.email,
              name: profile?.name,
              avatar: profile?.picture,
              typeAccount: "google",
              password: "phohoccode",
            }),
          });
        }

        token.typeAccount = "google";
      } else if (account?.provider === "credentials") {
        token.typeAccount = "credentials";
      }

      // Gọi api lấy thông tin user gán cho token
      const query = `email=${token?.email}&typeAccount=${
        account?.provider ?? token?.typeAccount
      }`;

      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile?${query}`
      );

      const data = await response.json();

      token.id = data?.result?.id;
      token.role = data?.result?.role;
      token.email = data?.result?.email;
      token.image = data?.result?.avatar;
      token.username = data?.result?.username;
      token.typeAccount = data?.result?.typeAccount;
      token.gender = data?.result?.gender;
      token.createdAt = data?.result?.createdAt;

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

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
