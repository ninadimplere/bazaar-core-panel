import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazaar - Order Management",
  description:
    "Manage your orders efficiently with Bazaar's order management tools.",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
