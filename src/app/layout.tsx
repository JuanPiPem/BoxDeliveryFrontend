import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";
import "./globals.scss";
import Navbar from "commons/navbar/Navbar";
// import { Provider } from "react-redux";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "700", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Box Delivery App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isLogged = false;
  const isLogged = true;

  return (
    <html lang="en">
      <body className={`${roboto.className} body`}>
        {isLogged ? <Navbar /> : null}
        {children}
      </body>
    </html>
  );
}
