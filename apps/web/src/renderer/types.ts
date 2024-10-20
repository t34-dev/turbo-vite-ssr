export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = {};

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltIn<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
