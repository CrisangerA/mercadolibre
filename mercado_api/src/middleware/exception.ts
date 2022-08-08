import { NextFunction, Request, Response } from 'express';
import { BadRequestError, InternalServerError } from '../models/errors';

export default class HandleExceptionsMiddleware {
  intercep(error: any, req: Request, res: Response, next: NextFunction) {
    // Not found    
    if (error instanceof BadRequestError) {
      return res.status(400).json(error.message);
    }
    // Internal
    if(error instanceof InternalServerError){
      return res.status(500).json(error.message);
    }
    // Other
    if(Object.values(error).includes('resource not found')) {
      return res.status(400).json(error);
    }
    // Default
    return res.status(error?.code ?? 500).json({ error: error?.message ?? error.toString() });
  }
}