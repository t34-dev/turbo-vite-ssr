import { Button } from 'ui';
import { useStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { ButtonX } from "../components/ButtonX/ButtonX.tsx";
import viteLogo from '/vite.svg'
import viteLogo2 from '/test/vite.svg'

export function Page({ initialData }: { initialData?: any }) {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      console.log('SENDING REQUEST...');
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return res.json();
    },
    initialData: initialData
  });

  return (
    <div>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo"/>
        <img src={viteLogo2} className="logo" alt="Vite logo"/>
      </div>
      <div>
        <img src='/vite.svg' className="logo" alt="Vite logo"/>
        <img src='/test/vite.svg' className="logo" alt="Vite logo"/>
      </div>
      <h1>Welcome to Turbo + Vite + SSR + React + TS + SCSS + Zustand + React Query!!!</h1>
      <ButtonX/>
      <Button/>
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
