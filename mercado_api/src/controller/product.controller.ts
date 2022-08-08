import { Router, NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../models/errors';
import { autoInjectable } from 'tsyringe';
import Product from '../models/product';
import ProductService from '../services/product.service';
import GenericController, { IGenericController } from './generic.controller';

export interface IProductController extends IGenericController {
  routes(path: string): Router;
}

@autoInjectable()
export default class ProductController extends GenericController<Product> implements IProductController {
  private router: Router;
  constructor(private _service: ProductService) {
    super(_service);
    this.router = Router();
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this._service.GetProductById(req.params.id);
      if (!product) throw new BadRequestError('Entity not found');
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async SearchItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      if (!q) throw new BadRequestError('Invalid search query');
      const products = await this._service.SearchProduct(q as string);
      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  routes(): Router {
    this.router.get('/items/:id', (req, res, next) => this.GetById(req, res, next));
    this.router.get('/items', (req, res, next) => this.SearchItem(req, res, next));
    return this.router;
  }
}
