import { aks_pemakai, para_level_user } from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            id: string;
            username: string;
            level: para_level_user;
        } & DefaultSession["user"];
    }

    export interface AdapterUser extends User {
        /** A unique identifier for the user. */
        id: string;
        name: string;
        username: string;
        email: string;
        level: para_level_user;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userId: string;
        level: para_level_user;
    }
}
