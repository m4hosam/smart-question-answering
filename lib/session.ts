import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { autherizeUser, getUser } from "@/lib/authController";
// import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        console.log("credentials in session: ", credentials);
        const authorizedUserResponse = await autherizeUser(
          credentials?.email as string,
          credentials?.password as string
        );
        console.log("user in autherize session: ", authorizedUserResponse);
        if (authorizedUserResponse?.status === 200) {
          return authorizedUserResponse.data;
        } else {
          return null;
        }
      },
    }),
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {
  //     const encodedToken = jsonwebtoken.sign(
  //       {
  //         ...token,
  //         iss: "grafbase",
  //         exp: Math.floor(Date.now() / 1000) + 60 * 60,
  //       },
  //       secret
  //     );

  //     return encodedToken;
  //   },
  //   decode: async ({ secret, token }) => {
  //     const decodedToken = jsonwebtoken.verify(token!, secret);
  //     return decodedToken as JWT;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET!,
  // session: { strategy: "jwt" },
  pages: {
    signIn: "/account/login",
    signOut: "/auth/signout",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/account/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: "light",
    logo: "/next.svg",
  },
  callbacks: {
    async jwt({ token, user }) {
      // combine user data from DB with token data
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session;
}
