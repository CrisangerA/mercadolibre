import { NextFunction, Request, Response } from 'express';

export default class FilterQueryMiddleware {
  intercep(req: Request, res: Response, next: NextFunction) {
    Object.keys(req.query).map((value) => {
      let query = (req.query[value] as string);
      if (query.includes(' ')) {
        req.query[value] = query.replace(/ /g, '%20');
      };
      return value;
    });
    next();
  }
}
