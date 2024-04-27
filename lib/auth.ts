import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { AdapterUser, NextAuthOptions } from "next-auth/";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();
export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text " },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log({ credentials });
                if (!credentials) {
                    throw new Error("invalid crendetials!");
                }
                const username = credentials?.username;
                const password = credentials?.password;

                try {
                    const user = await prisma.aks_pemakai.findUnique({
                        where: {
                            username: username,
                        },
                        select: {
                            id_pemakai: true,
                            username: true,
                            name: true,
                            email: true,
                            password: true,
                            para_level_user: true,
                        },
                    });

                    if (!user) throw new Error("User not found!");

                    const isMatch = await compare(password, user.password);

                    if (!isMatch) throw new Error("Email or password is incorrect");

                    return Promise.resolve({
                        id: user.id_pemakai,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        level: user.para_level_user,
                    });
                } catch (error) {
                    throw new Error(error as string);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        updateAge: 50 * 60,
    },
    jwt: {
        maxAge: 60 * 60, // Set token to expire after 1 hour
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && account.type === "credentials" && user) {
                token.userId = account.providerAccountId;
                token.level = (user as AdapterUser).level;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId;
                session.user.level = token.level;
            }
            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
