import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazaar - Brand Management",
  description:
    "Manage your brand effectively with Bazaar's brand management tools.",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
