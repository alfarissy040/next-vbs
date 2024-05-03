"use client"

import { NextUIProvider } from "@nextui-org/react";
import { AppProgressBar } from "next-nprogress-bar";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import useAuth from "./useAuth";

const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    const { systemTheme, theme } = useTheme();
    // useAuth()
    return (
        <NextUIProvider >
            <AppProgressBar
                height="4px"
                color="#2563eb"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <NextThemesProvider attribute="class" themes={['light', 'dark', "system"]} defaultTheme={theme ?? systemTheme}>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}

export default StyleProvider