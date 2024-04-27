"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const AuthProvider = ({ children, session }: { children: React.ReactNode; session?: Session | null }) => {
    return (
        <SessionProvider session={session}>
            {children}
            <Toaster />
        </SessionProvider>
    );
};

export default AuthProvider;
