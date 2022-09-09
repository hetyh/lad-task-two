import { startServer } from './storage.js';

try {
  await startServer();
} catch (error) {
  console.log(error);
}
