import 'reflect-metadata';
import { container } from 'tsyringe';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Express } from 'express';
import db from './src/config/db';
import ProductController from './src/controller/product.controller';
import HandleExceptionsMiddleware from './src/middleware/exception';
import FilterQueryMiddleware from './src/middleware/filter';

class Main {

  private app: Express;
  constructor() {
    this.app = express();
  }

  private config() {
    this.app.set('PORT', process.env.PORT);
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(express.json());
  }
  private di() {
    container.register('mercadolibrebaseurl', { useValue: 'api.mercadolibre.com' });
    container.register('rickandmortybaseurl', { useValue: 'rickandmortyapi.com' });
  }
  private middlewares() {
    const filterQueryMiddleware = container.resolve(FilterQueryMiddleware);

    this.app.use(
      ['/api/items'],
      filterQueryMiddleware.intercep
    );
  }
  private routes() {
    const productController = container.resolve(ProductController);
    const handleExceptionsMiddleware = container.resolve(HandleExceptionsMiddleware);

    this.app.use('/api', productController.routes());
    this.app.use(handleExceptionsMiddleware.intercep);
  }
  private initialize() {
    this.config();
    this.di();
    this.middlewares();
    this.routes();
  }

  public run(): Promise<Express> {
    return new Promise((resolve, reject) => {
      // 1. Stablish connection with database
      db.connect().then(() => {
        // 2. Start server 
        this.initialize();
        this.app.listen(this.app.get('PORT'), () => {
          console.log('!!! DB connected and server listening on port ' + this.app.get('PORT'));
          resolve(this.app);
        });
      })
        .catch(err => reject('DB error: ' + err.message))
    });
  }
}
const server = new Main();
export default server;
