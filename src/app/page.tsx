"use client";
import React from "react";
import Login from "../components/login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import SwornDeclaration from "components/deliveryMan/swornDeclaration/SwornDeclaration";
import StartWorkDay from "components/deliveryMan/startWorkDay/StartWorkDay";
import Navbar from "commons/navbar/Navbar";
import ManageOrders from "components/admin/manageOrders/ManageOrders";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.is_admin ? (
        <>
          <Navbar />
          <ManageOrders />
        </>
      ) : !user.is_enabled ? (
        <>
          <Navbar />
          <SwornDeclaration />
        </>
      ) : (
        <>
          <Navbar />
          <StartWorkDay />
        </>
      )}
    </>
  );
}
