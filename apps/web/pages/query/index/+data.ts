import type { Todo, TodoMinimal } from "../types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const config = useConfig();

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todoData = (await response.json()) as Todo;

  config({
    title: `Todo: ${todoData.title}`,
  });

  // Минимизируем данные если нужно
  return todoData;
};

// Опционально: функция минимизации данных
function minimize(todo: Todo): TodoMinimal {
  const { id, title } = todo;
  return { id, title };
}
