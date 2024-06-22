import { prisma } from "@/app/utilities/ServerUtilities";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AdapterUser, NextAuthOptions } from "next-auth/";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text " },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
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
                            email: true,
                            password: true,
                            para_level_user: true,
                            karyawan: {
                                include: {
                                    kantor: true,
                                },
                            },
                        },
                    });

                    if (!user) throw new Error("User not found!");

                    const isMatch = await compare(password, user.password);

                    if (!isMatch) throw new Error("Email or password is incorrect");

                    return Promise.resolve({
                        id: user.id_pemakai,
                        email: user.email,
                        username: user.username,
                        name: user.karyawan.name,
                        kantor: user.karyawan.kantor,
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
        async jwt({ token, account, user: dataUser }) {
            const user = dataUser as AdapterUser;
            if (account && account.type === "credentials" && user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.name = user.name;
                token.kantor = user.kantor;
                token.level = user.level;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.level = token.level;
                session.user.kantor = token.kantor;
            }
            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
