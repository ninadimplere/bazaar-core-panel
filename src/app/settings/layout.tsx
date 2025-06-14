import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazaar - Settings",
  description:
    "Configure your Bazaar experience with various settings and preferences.",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
