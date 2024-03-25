"use client";
import React, { ReactNode } from "react";
import Navbar from "commons/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <>
      {user.id ? <Navbar /> : null}
      {user.id === null
        ? router.push("/login")
        : !user.is_admin
        ? children
        : router.push("/admin/manage-orders")}
    </>
  );
}
