import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazaar - Product Management",
  description:
    "Manage your products efficiently with Bazaar's product management tools.",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
