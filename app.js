import dotEnv from 'dotenv';

import Server from './models/server';

dotEnv.config();

const server = new Server();
server.listen();
