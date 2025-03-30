"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AppProgressBar } from "next-nprogress-bar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextUIProvider>
            <AppProgressBar height="4px" color="#2563eb" options={{ showSpinner: false }} shallowRouting />
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
