import * as Hapi from '@hapi/hapi';
import { config } from 'dotenv';
import testPlugin from './plugins/test.js';
config();
const server = Hapi.server({
    port: process.env.HAPI_PORT || 3000,
    host: process.env.HAPI_HOST || '0.0.0.0',
});
export async function createServer() {
    await server.register([testPlugin]);
    await server.initialize();
    return server;
}
export async function startServer(server) {
    await server.start();
    server.log('info', `Server running on ${server.info.uri}`);
    console.log(`Server running on ${server.info.uri}`);
    return server;
}
process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map