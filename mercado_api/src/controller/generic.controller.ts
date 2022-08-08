import { NextFunction, Request, Response } from 'express';
import { IGenericService } from '../services/generic.service';

export interface IGenericController {  
}

/**
 * @class GenericController
 * @desc Responsible for handling to API CRUD requests for all routes
 * @param {GenericService} genericService GenericService<T>
 **/
export default class GenericController<T> implements IGenericController {
  private _genericService: IGenericService<T>;
  constructor(genericService: IGenericService<T>) {
    this._genericService = genericService;
  }

  async SearchItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json('Invalid search query');
      const products = await this._genericService.SearchItem(q as string);
      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {      
      const product = await this._genericService.GetById(req.params.id);
      if (!product) res.status(400).send('Entity not found')
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
}
