export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Можем добавить минимизированную версию если нужно
export interface TodoMinimal {
  id: number;
  title: string;
}
