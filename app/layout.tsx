import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header_footer/header"
import Footer from "@/components/header_footer/footer"

export const metadata: Metadata = {
  title: "ProfResume",
  description: "Умный конструктор резюме",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased overflow-x-hidden">
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}/>
        <Header/>
        <main className="relative z-10 pt-18.25">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
