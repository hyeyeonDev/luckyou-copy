import React from "react";
import { TarotProvider } from "@/context/TarotContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <TarotProvider>{children}</TarotProvider>;
}
