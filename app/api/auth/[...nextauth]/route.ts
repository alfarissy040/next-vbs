import { authOption } from "@/lib/auth"
import NextAuth from "next-auth/next";

const handlers = NextAuth(authOption)

export { handlers as GET, handlers as POST };