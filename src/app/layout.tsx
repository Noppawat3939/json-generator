import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "JSON Generator",
  description: "JSON Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
