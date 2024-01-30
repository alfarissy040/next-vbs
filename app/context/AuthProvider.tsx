"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export interface AuthProviderProps {
    children: React.ReactNode;
    session: Session | null
}

export default function AuthProvider({
    children, session
}: AuthProviderProps) {
    const [interval, setInterval] = useState(60)
    useEffect(() => {
        if (!!session) {
            console.log(session)
        }
    }, [session]);
    return <SessionProvider session={session}>{children}</SessionProvider>;
}