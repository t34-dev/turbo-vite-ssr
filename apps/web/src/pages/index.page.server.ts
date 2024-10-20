// index.page.server.ts
export async function onBeforeRender() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const initialData = await res.json();
  return {
    pageContext: {
      initialData
    }
  };
}
