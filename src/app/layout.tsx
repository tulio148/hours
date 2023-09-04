import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TimerProvider } from "@/providers/timerProvider";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hours",
  description: "Produtivity app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TimerProvider>{children}</TimerProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
