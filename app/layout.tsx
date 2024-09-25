import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Quiz - Desempenho de Sistemas em Nuvem",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased justify-start sm:justify-center items-center py-20 flex flex-col gap-6 scroll-gutter-stable",
          inter.variable
        )}
      >
        <div className="flex flex-col gap-12 w-full px-5 sm:px-10 lg:w-[50vw] lg:px-0 grow min-[1920px]:w-[40vw]">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
