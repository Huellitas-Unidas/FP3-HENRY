/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id?: string; // Añade la propiedad id
      role?: string; // Añade la propiedad role
      accessToken?: string; // Mantén accessToken si es necesario
      token?: string; // Añade la propiedad token
    };
  }

  interface User extends DefaultUser {
    id?: string; // Añade la propiedad id
    role?: string; // Añade la propiedad role
    accessToken?: string; // Mantén accessToken
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Añade la propiedad id
    role?: string; // Añade la propiedad role
    accessToken?: string; // Mantén accessToken
    token?: string; // Añade la propiedad token
  }
}
