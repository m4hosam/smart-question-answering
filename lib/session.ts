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
        const authorizedUser = await autherizeUser(
          credentials?.email as string,
          credentials?.password as string
        );
        console.log("user in autherize session: ", authorizedUser);
        if (!authorizedUser) {
          return null;
        } else {
          return authorizedUser;
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
      /* Step 1: update the token based on the user object */
      if (token?.email) {
        const data = await getUser(token?.email);
        console.log("jwt user: ", user);
        token = {
          id: data.id,
          email: data.email,
          role: data?.role,
        };
      }
      console.log("tokein in jwt", token);
      return token;
    },
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        // const data = await getUser(email);
        // // console.log("data in session: ", data)
        // // Here i changed the name of the user to the id of the user
        // const newSession = {
        //   ...session,
        //   user: {
        //     ...session.user,
        //     id: data.id,
        //     name: data.name,
        //     email: data.email,
        //     role: data.role,
        //   },
        // };

        return session;
      } catch (error: any) {
        // console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // console.log("User signin: ", user)
        // const userExists = await getUser(user?.email as string)
        // console.log("userExists session: ", userExists)

        // if (!userExists) {
        //     return false
        // }

        return true;
      } catch (error: any) {
        // console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session;
}
