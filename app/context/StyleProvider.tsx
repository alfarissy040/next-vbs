"use client"

import { NextUIProvider } from "@nextui-org/react";
import { AppProgressBar } from "next-nprogress-bar";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    const { systemTheme, theme } = useTheme();
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