import express from 'express';
import { createServer as createViteServer } from 'vite';
import { renderPage } from 'vite-plugin-ssr/server';

const isProduction = process.env.NODE_ENV === 'production';
const root = process.cwd();

startServer();

async function startServer() {
    const app = express();
    if (isProduction) {
        app.use(express.static(`${root}/dist/client`));
    } else {
        const viteServer = await createViteServer({
            root,
            server: { middlewareMode: true },
        });
        app.use(viteServer.middlewares);
    }

    app.get('*', async (req, res, next) => {
        const pageContextInit = {
            urlOriginal: req.originalUrl,
        };
        const pageContext = await renderPage(pageContextInit);
        const { httpResponse } = pageContext;
        if (!httpResponse) return next();
        const { body, statusCode, contentType } = httpResponse;
        res.status(statusCode).type(contentType).send(body);
    });

    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}
