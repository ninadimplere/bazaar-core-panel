import "@css/satoshi.css";
import "@css/style.css";

import { Sidebar } from "@components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Bazaar - Admin Dashboard",
    default: "Bazaar - Admin Dashboard",
  },
  description:
    "Bazaar is a powerful admin dashboard template designed for e-commerce applications. It offers a wide range of features and components to help you manage your online store efficiently.",
  keywords: [
    "Bazaar",
    "Admin Dashboard",
    "E-commerce",
    "Admin Template",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Dashboard",
    "UI Kit",
    "Web Application",
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#004155" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate w-full overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
