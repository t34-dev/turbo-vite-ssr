import ReactDOMServer from 'react-dom/server';
import { PageShell } from './PageShell';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import type { PageContextServer } from './types';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export { render };
export { passToClient };

const passToClient = ['pageProps', 'urlPathname'];

async function render(pageContext: PageContextServer) {
  const queryClient = new QueryClient()

  const { Page, pageProps } = pageContext;
  const pageHtml = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
    </QueryClientProvider>
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || 'Vite SSR app';
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
