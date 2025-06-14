import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazaar - Customers",
  description:
    "Manage your customers efficiently with Bazaar's customer management tools.",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
