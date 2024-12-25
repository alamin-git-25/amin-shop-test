import NextAuth from "next-auth"
import { authOption } from "./authOption/option";

const handlers = NextAuth(authOption);

export { handlers as GET, handlers as POST }