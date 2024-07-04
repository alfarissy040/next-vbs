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
                    throw ({
                        status: 401,
                        message:"invalid crendetials!"
                    });
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

                    if (!user) throw ({
                        status: 404,
                        message: "User not found!"
                    });

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
                    throw error;
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
            if (account && account.type === "credentials") {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    kantor: user.kantor,
                    level: user.level,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    email: token.email,
                    level: token.level,
                    kantor: token.kantor,
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
