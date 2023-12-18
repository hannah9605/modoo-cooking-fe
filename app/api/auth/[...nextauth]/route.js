import NextAuth from "next-auth";
import { options } from "./options";
// import { Options } from "next/dist/server/base-server"

const handler = NextAuth(options);

export { handler as GET, handler as POST };
