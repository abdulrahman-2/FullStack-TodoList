import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Header from "@/components/layout/Header";
import SessionProviderLayout from "@/components/common/SessionProviderLayout";
import Notifications from "@/components/common/Notifications";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "This is a Todo App built with Next.js 14 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderLayout>
            <Notifications />
            <Header />
            <div className="container flex flex-col items-center justify-center h-[calc(100vh-120px)]">
              {children}
            </div>
          </SessionProviderLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
