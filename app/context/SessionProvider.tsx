"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const SessionProvider = ({ children, session }: { children: React.ReactNode; session?: Session | null }) => {
    return (
        <Provider session={session}>
            {children}
            <Toaster />
        </Provider>
    );
};

export default SessionProvider;
