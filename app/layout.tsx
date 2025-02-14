import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess AI Bot",
  description: "Chess AI Bot by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          visibleToasts={5}
          position="bottom-right"
          theme="system"
          richColors={true}
          closeButton={true}
          offset="10px"
          invert={true}
          duration={3000}
        />
      </body>
    </html>
  );
}
