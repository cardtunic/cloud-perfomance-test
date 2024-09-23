import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Questionário - Desempenho de Sistemas em Nuvem",
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
          "min-h-screen bg-background font-sans antialiased justify-start sm:justify-center items-center py-12 flex flex-col gap-6 scroll-gutter-stable",
          inter.variable
        )}
      >
        <div className="flex flex-col gap-16 w-full px-5 sm:px-10 lg:w-[50vw] lg:px-0 grow min-[1920px]:w-[40vw]">
          <div className="flex gap-4 lg:gap-2 justify-between items-center w-full flex-col lg:flex-row ">
            <div className="flex flex-col gap-1 items-center lg:items-start">
              <p className="text-xl font-semibold text-center lg:text-end text-foreground">
                Questionário - Desempenho de Sistemas em Nuvem
              </p>
              <p className="text-sm text-foreground/50">
                Feito com base na avaliação do IBC
              </p>
              {/* <p className="text-sm text-black/50">
                Entenda suas habilidades e pontos de melhoria
              </p> */}
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
