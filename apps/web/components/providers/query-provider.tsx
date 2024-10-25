import React from "react";
import { QueryClient, QueryClientProvider, type DefaultOptions } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

// Настройки по умолчанию для всех запросов
const defaultOptions: DefaultOptions = {
  queries: {
    // Данные считаются свежими в течение 5 минут
    staleTime: 1000 * 60 * 5,
    // Кешируем данные на 30 минут
    gcTime: 1000 * 60 * 30,
    // Отключаем автоматическую перезагрузку при фокусе окна
    refetchOnWindowFocus: false,
    // Отключаем перезагрузку при переподключении
    refetchOnReconnect: false,
    // Повторяем запрос 3 раза при ошибке
    retry: 3,
  },
};

export function QueryProvider({ children }: { children: ReactNode }) {
  // Создаем инстанс QueryClient для каждой сессии
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
