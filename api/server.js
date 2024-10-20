import { createServer } from 'http';
import { renderPage } from 'vite-plugin-ssr/server';
import { createApp } from '../apps/web/server';

const app = createApp();

export default function handler(req, res) {
    const server = createServer(app);
    server.listen(0, () => {
        const { port } = server.address();
        fetch(`http://localhost:${port}${req.url}`, {
            method: req.method,
            headers: req.headers,
            body: req.body,
        }).then((response) => {
            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
                res.setHeader(key, value);
            });
            return response.body.pipe(res);
        });
    });
}
