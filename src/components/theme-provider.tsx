import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const isDarkColorSchemePreferred = useMediaQuery(
    "(prefers-color-scheme: dark)",
  );

  const theme = useMemo<Theme>(
    () => (isDarkColorSchemePreferred ? "dark" : "light"),
    [isDarkColorSchemePreferred],
  );

  useEffect(() => {
    window.document.documentElement.classList.remove("light", "dark");
    window.document.documentElement.classList.add(theme);
  }, [theme]);

  return children;
}
