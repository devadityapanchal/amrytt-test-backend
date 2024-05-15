require('dotenv').config();
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { logger, stream } from '@utils/logger';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { NODE_ENV, PORT, LOG_FORMAT, API_VERSION } from '@config';
import connectMongoDB from './models';
import path from 'path';

export default class App {
  readonly app: express.Application;
  readonly env: string;
  readonly port: string | number;
  server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor(data: { apiRoutes: Routes[]; generalRoutes: Routes[] }) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.initializeDB();
    this.initializeMiddlewares();

    this.initializeRoutes(data.apiRoutes);
    this.initializeRoutes(data.generalRoutes, false);

    this.initializeErrorHandling();
  }

  public readonly listen = async () => {
    this.server = this.app.listen(this.port, () => {
      logger.info('=================================');
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info('=================================');
    });
  };

  private readonly initializeMiddlewares = () => {
    this.app.set('trust proxy', 1);
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(`${API_VERSION}/images/`, express.static(path.join(__dirname, '../public/images')));
  };

  private readonly initializeRoutes = (routes: Routes[], setVersion = true) => {
    const prefix = setVersion ? `${API_VERSION}/` : '';
    routes.forEach((route) => {
      this.app.use(`${prefix}`, route.router);
    });
  };

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async initializeDB() {
    await connectMongoDB();
  }
}
