import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="flex flex-col bg-[#f3faf8] text-gray-900 h-screen justify-around p-4 overflow-y-scroll">
        <Navbar /> 
       <main className="flex-grow w-full">
           {children}
        </main>
     <Footer /> 
     </body>
    </html>
  );
}
