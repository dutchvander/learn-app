// src/components/ThemeProvider.jsx
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = ({ children }) => {
    return (
        <NextThemesProvider attribute="class">
            {children}
        </NextThemesProvider>
    );
};
