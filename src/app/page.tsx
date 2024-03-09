"use client";
import React from "react";
import Login from "../components/login/Login";
import StartWorkDay from "components/deliveryMan/startWorkDay/StartWorkDay";
import DeliveryMen from "components/admin/deliveryMen/DeliveryMen";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.is_admin ? (
        <DeliveryMen />
      ) : (
        <StartWorkDay />
      )}
    </>
  );
}
