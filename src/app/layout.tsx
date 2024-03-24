import "./globals.css";
import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import { TimerProvider } from "@/providers/timerProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ActivityProvider } from "@/providers/activityProvider";
const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

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
    <ClerkProvider
      appearance={{
        elements: {
          card: {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      <html lang="en">
        <body className={urbanist.className}>
          <ActivityProvider>
            <TimerProvider>{children}</TimerProvider>
          </ActivityProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
