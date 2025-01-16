/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id?: string; 
      role?: string; 
      accessToken?: string; 
      token?: string; 
    };
  }

  interface User extends DefaultUser {
    id?: string; 
    role?: string; 
    accessToken?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; 
    role?: string; 
    accessToken?: string; 
    token?: string; 
  }
}
