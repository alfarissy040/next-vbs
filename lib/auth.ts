import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth/";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        refreshTokenExpires?: number;
        expires_at?: number;
        refresh_token?: string;
        access_token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

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
                console.log({ credentials })
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
                            password: true
                        }
                    })

                    if (!user) throw new Error("User not found!");

                    const isMatch = await compare(password, user.password);

                    if (!isMatch) throw new Error("Email or password is incorrect");

                    return Promise.resolve({
                        id: user.id_pemakai,
                        username: user.username,
                        name: user.name,
                        email: user.email
                    })
                } catch (error) {
                    throw new Error(error as string);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        updateAge: 50 * 60
    },
    jwt: {
        maxAge: 60 * 60, // Set token to expire after 1 hour
    },
    callbacks: {
        async jwt({ token, user, account, session }) {
            console.log({
                token: token,
                user: user,
                account: account,
                session: session
            })
            if (user && account) {
                // This will only be executed at login. Each next invocation will skip this part.
                token.access_token = account.access_token!;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
            }
            if (token.expires_at && Date.now() < session.expires_at) {
                return Promise.resolve(token);
            }

            // If the call arrives after 23 hours have passed, we allow to refresh the token.
            const refreshedToken = await refreshAccessToken(token?.refresh_token as string);

            return Promise.resolve({
                ...token,
                accessToken: refreshedToken.access_token,
                accessTokenExpires: refreshedToken.expires_at,
                refreshToken: refreshedToken.refresh_token,
                error: refreshedToken?.error,
            });
        },
        session: async ({ session, token }) => {
            console.log({
                session: session,
                token: token
            })
            // Here we pass accessToken to the client to be used in authentication with your API
            return Promise.resolve({
                ...session,
                access_token: token.access_token as string,
                expires: token.refresh_token as string,
            });
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const refreshAccessToken = async (refresh_token: string) => {
    try {
        // Get a new set of tokens with a refreshToken
        const tokenResponse: JWT = await fetch(process.env.NEXTAUTH_URL + "auth/refreshToken", {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refresh_token,
            }),
        }).then((response) => response.json());

        return {
            access_token: tokenResponse.access_token,
            expires_at: tokenResponse.expires_at,
            refresh_token: tokenResponse.refresh_token,
        };
    } catch (error) {
        return {
            error: "RefreshAccessTokenError",
        };
    }
};