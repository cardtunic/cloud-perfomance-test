import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
          {/* <div className="flex gap-3 sm:gap-5 items-center flex-col sm:flex-row">
            <Cloudy className="jh text-accent h-12 w-12 shrink-0" />
            <div className="flex flex-col gap-3 sm:gap-1">
              <p className="text-center sm:text-start">
                <span className="rounded-md py-1 px-2 bg-primary w-fit text-primary-foreground mr-2">
                  Quiz
                </span>
                Avaliação de desempenho
              </p>
              <p className="text-xl font-semibold text-foreground text-center sm:text-start">
                Sistemas de Computação em Nuvem
              </p>
            </div>
          </div> */}
          {children}
        </div>
      </body>
    </html>
  );
}
