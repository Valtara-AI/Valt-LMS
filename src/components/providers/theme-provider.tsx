"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// Import types from root to avoid relying on internal path that may change
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
