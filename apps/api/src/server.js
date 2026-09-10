import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, '..', '..', 'web');

const app = Fastify({ logger: true });

await app.register(fastifyStatic, {
  root: webRoot,
});

app.get('/api/health', async () => ({ ok: true }));

const port = Number(process.env.PORT) || 3000;

app.listen({ port, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
