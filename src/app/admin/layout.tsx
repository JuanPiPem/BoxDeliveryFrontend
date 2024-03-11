"use client";
import React, { ReactNode } from "react";
import Navbar from "commons/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      {user.id ? <Navbar /> : null}
      {children}
    </>
  );
}
