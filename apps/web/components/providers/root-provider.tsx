import React from "react";
// components/providers/root-provider.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ... другие провайдеры

export function RootProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
}
