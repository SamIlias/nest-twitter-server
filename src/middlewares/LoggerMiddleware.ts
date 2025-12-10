import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    // console.log(
    //   `${req.method} ${req.url} body:${JSON.stringify(req.body)} credentials: ${req.credentials} `,
    // );
    next();
  };
}
