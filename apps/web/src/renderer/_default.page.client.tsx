import ReactDOM from 'react-dom/client';
import { PageShell } from './PageShell';
import type { PageContextClient } from './types';

export { render };

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  ReactDOM.hydrateRoot(
    document.getElementById('app')!,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}

export const clientRouting = true;
export const hydrationCanBeAborted = true;
