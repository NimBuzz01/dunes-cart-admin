import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import ToastProvider from "@/providers/toast-provider";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Dunes Cart - Admin Dashboard",
  description: "A point to manage your stores, categories and products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={archivo.className}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
