import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";

interface ExtendedUser {
  profileId?: string;
  accessToken?: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }

  // interface User {}
  //
  // interface Account {}
  //
  // interface Profile {}
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
  }
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        console.log("authorize", credentials);

        const user = await prisma.user.findUnique({ where: { email } });
        if (user === null) {
          throw new Error("No account was found with that email.");
        }

        const passwordHash = user.passwordHash ?? "";

        const isValidPassword = await compare(password, passwordHash);
        if (!isValidPassword) {
          throw new Error("Your password was incorrect.");
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
};

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions);
}
