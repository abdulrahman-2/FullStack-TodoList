import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Notifications from "@/components/common/Notifications";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication page",
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
          <Notifications />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
