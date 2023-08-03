import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { TimeProvider } from "@/context/timeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hours",
  description: "Produtivity app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TimeProvider>{children}</TimeProvider>
      </body>
    </html>
  );
}
