import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.cookies.SWFavesUserID == null || req.cookies.SWFavesUserID == undefined)
    {
        res.cookie('SWFavesUserID', Math.round(Math.random() * 1000000000));
    }
    next();
  }
}