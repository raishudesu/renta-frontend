import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Roles } from "./user.type";

declare module "next-auth" {
  // Extend the User interface to include accessToken
  interface User extends DefaultUser {
    roles: Roles[];

    accessToken?: string;
  }

  // Extend the Session interface to include accessToken in the user object
  interface Session {
    user: {
      id?: string;
      roles: unknown;
      token?: string;
      accessToken?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  // Extend the JWT interface to include accessToken
  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
