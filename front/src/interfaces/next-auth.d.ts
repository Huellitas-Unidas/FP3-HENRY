/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      accessToken?: string;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}



