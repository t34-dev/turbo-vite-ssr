import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryProvider } from "./query-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryProvider>{children}</QueryProvider>
    </ClerkProvider>
  );
}
