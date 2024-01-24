import { aks_pemakai } from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        refreshTokenExpires?: number;
        expires_at?: string;
        refresh_token?: string;
        access_token?: string;
        error?: string;
        user?: aks_pemakai;
    }
}

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