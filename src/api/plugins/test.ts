import * as Hapi from '@hapi/hapi';
import { config } from 'dotenv';
import { connect, Empty, StringCodec } from 'nats';
import { notFound } from '@hapi/boom';

config();

const testPlugin = {
  name: 'app/test',
  register: async (server: Hapi.Server) => {
    server.route({
      method: 'GET',
      path: '/api/test',
      handler: testFind,
    });
  },
};

async function testFind(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  try {
    const natsConnection = await connect({
      servers: `${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    });
    const stringCodec = StringCodec();
    const request = await natsConnection.request('test.find', Empty, { timeout: 1000 });
    const decodedData = stringCodec.decode(request.data);
    return h.response(decodedData).code(200);
  } catch (err) {
    console.error(err);
  }
}

export default testPlugin;
