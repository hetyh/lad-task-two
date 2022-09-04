import * as Hapi from '@hapi/hapi';
import { config } from 'dotenv';
import testPlugin from './plugins/test.js';
import { parse } from 'qs';

config();

const server: Hapi.Server = Hapi.server({
  port: process.env.HAPI_PORT || 3000,
  host: process.env.HAPI_HOST || '0.0.0.0',
  query: {
    parser: (query) => parse(query),
  },
});

export async function createServer(): Promise<Hapi.Server> {
  await server.register([testPlugin]);
  await server.initialize();
  return server;
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  server.log('info', `Server running on ${server.info.uri}`);
  console.log(`Server running on ${server.info.uri}`);
  return server;
}

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});
