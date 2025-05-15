"use client";

import { SidebarProvider } from "@components/Layouts/sidebar/sidebar-context";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
