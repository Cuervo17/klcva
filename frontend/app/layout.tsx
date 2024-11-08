import type { Metadata } from "next";
import "./globals.css";
import ClientSessionProvider from "./ClientSessionProvider";
import NavBar from "./NavBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "KLCVA",
  description: "Casa de subastas 100% mexicana con productos de distintas categorías",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
