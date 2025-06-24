"use client";

import { ApolloProvider } from "@apollo/client";
import { SidebarProvider } from "@components/Layouts/sidebar/sidebar-context";
import { HeroUIProvider } from "@heroui/system";
import client from "@lib/apollo-client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <HeroUIProvider>
        <ThemeProvider defaultTheme="light" attribute="class">
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </HeroUIProvider>
    </ApolloProvider>
  );
}
