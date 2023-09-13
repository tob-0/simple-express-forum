import express, { Express, Router } from 'express';
import Config from './config/config';

export class App {
  private static instance: App;
  private server: Express;
  private port: Number;
  private constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.disable('x-powered-by');
    this.port = Config.common.port;
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public registerRouter(path: string, router: Router) {
    this.server.use(path, router);
  }

  public serve() {
    return this.server.listen(this.port);
  }
}
