"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    const { systemTheme, theme } = useTheme();
    return (
        <NextUIProvider >
            <NextThemesProvider attribute="class" themes={['light', 'dark', "system"]} defaultTheme={theme ?? systemTheme}>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}

export default StyleProvider