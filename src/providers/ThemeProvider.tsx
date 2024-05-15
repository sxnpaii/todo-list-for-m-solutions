"use client";
import * as React from "react";
import { ThemeProvider as NThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NThemeProvider {...props}>{children}</NThemeProvider>;
};

export default ThemeProvider;
