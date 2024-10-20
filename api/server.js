import { createServer } from 'http';
import { renderPage } from 'vite-plugin-ssr/server'


export default async function handler(req, res) {
    const { method, url, headers } = req;
    const pageContextInit = {
        urlOriginal: url,
        method,
        headers,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
        res.statusCode = 404;
        res.end();
        return;
    }

    const { body, statusCode, contentType, headers: responseHeaders } = httpResponse;
    res.writeHead(statusCode, { ...responseHeaders, 'Content-Type': contentType });
    res.end(body);
}
