import ReactDOM from 'react-dom/client';
import { PageShell } from './PageShell';
import type { PageContextClient } from './types';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient()
export { render };

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  ReactDOM.hydrateRoot(
    document.getElementById('app')!,
    <QueryClientProvider client={queryClient}>
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
    </QueryClientProvider>
  );
}

export const clientRouting = true;
export const hydrationCanBeAborted = true;
