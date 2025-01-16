import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Providers from "./Providers";
import GoogleMapsProvider from "./GoogleMapsProvider";

export const metadata: Metadata = {
  title: "Huellas Unidas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-[#f3faf8] text-gray-900 h-screen justify-around p-4 overflow-y-scroll">
        <Providers>
          <GoogleMapsProvider>
            <Navbar />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </GoogleMapsProvider>
        </Providers>
      </body>
    </html>
  );
}

