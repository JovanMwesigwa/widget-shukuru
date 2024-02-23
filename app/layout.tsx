import { Inter as FontSans } from "next/font/google";
import AuthProvider from "@/provider/AuthProvider";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shukuru Utilities",
  description: "",
  icons: {
    icon: {
      url: "/logo.png",
      type: "image/png",
    },
    shortcut: { url: "/logo.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <Theme>
            <main className="">
              <Container>
                {children}

                <div className="w-full h-14">
                  <Link href="/privacy">
                    <h1 className="text-xs font-medium ">Privacy</h1>
                  </Link>
                </div>
              </Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
