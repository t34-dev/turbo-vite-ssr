import React from "react";
import { useData } from "vike-react/useData";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../store";
import type { Data } from "./+data";
import type { Todo } from "../types";

export default function Page() {
  const initialData = useData<Data>();
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  console.log("initialData", initialData);
  const { data, isLoading } = useQuery<Todo>({
    queryKey: ["todos"],
    queryFn: async () => {
      console.log("SENDING REQUEST...");
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
    initialData,
    staleTime: 1000 * 60,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Query + Zustand</h1>
      <div className="mb-4">
        <p className="mb-2">Count: {count}</p>
        <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Increment
        </button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Data from API:</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
            <div className="mt-4">
              <p>Title: {data.title}</p>
              <p>Completed: {data.completed ? "Yes" : "No"}</p>
              <p>ID: {data.id}</p>
              <p>User ID: {data.userId}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
