import { config } from 'dotenv';
import { connect, StringCodec, Subscription } from 'nats';
import { User } from '../entity/User.js';
import typeorm from './typeorm.js';

config();

// Create a connection to NATS
const natsConnection = await connect({ servers: `${process.env.NATS_HOST}:${process.env.NATS_PORT}` });

// Create a codec
const stringCodec = StringCodec();

// Create a connection to DB
const typeormConnection = await typeorm();

// This subscription listens for `test.find` requests and returns content from table `User`
const sub = natsConnection.subscribe('test.find');
console.log(`listening for ${sub.getSubject()} requests...`);
for await (const m of sub) {
  if (m.respond(stringCodec.encode(JSON.stringify(await typeormConnection.manager.find(User))))) {
    console.info(`[test.find] handled #${sub.getProcessed()}`);
  } else {
    console.log(`[test.find] #${sub.getProcessed()} ignored - no reply subject`);
  }
}
console.log(`subscription ${sub.getSubject()} drained.`);

// Wait for the client to close here.
await natsConnection.closed().then((err) => {
  let m = `connection to ${natsConnection.getServer()} closed`;
  if (err) {
    m = `${m} with an error: ${err.message}`;
  }
  console.log(m);
});
