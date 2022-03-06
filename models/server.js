import express, { urlencoded, json, static as expStatic } from 'express';

import Http from 'http';
import cors from 'cors';

import { connectBD } from '../database/connection';
import { UserRouter, CompanyRouter, AddressRouter } from '../routes';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = Http.createServer(this.app);

    this.paths = {
      users: '/api/users',
      companies: '/api/companies',
      addresses: '/api/addresses',
    };

    // BD Connectionb
    this.initializeBD();

    // Middlewares
    this.middlewares();

    // Api Routes
    this.routes();
  }

  async initializeBD() {
    await connectBD();
  }

  middlewares() {
    // CORS
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: '*',
      })
    );

    // Request's Read & Parse
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());

    // Public Dir
    this.app.use(expStatic('public'));
  }

  routes() {
    this.app.use(this.paths.users, UserRouter);
    this.app.use(this.paths.companies, CompanyRouter);
    this.app.use(this.paths.addresses, AddressRouter);
  }

  listen() {
    this.server.listen(this.port, () => console.log('Server Running on:', this.port));
  }
}
