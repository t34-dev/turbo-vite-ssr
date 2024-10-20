import { Button } from 'ui';
import { useStore } from '../store';
import { useQuery } from '@tanstack/react-query';

export function Page() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return res.json();
    }
  });

  return (
    <div>
      <h1>Welcome to Turbo + Vite + SSR + React + TS + SCSS + Zustand + React Query</h1>
      <Button />
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Data from API: {JSON.stringify(data)}</p>
      )}
    </div>
  );
}
