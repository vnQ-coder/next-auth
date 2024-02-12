"use client";

import { QueryClient, QueryClientProvider } from "react-query";

export function Providers(props: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
