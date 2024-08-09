// requestMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const requestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	console.log(`Incoming ${req.method} request for ${req.url}`);
	next();
};

export default requestMiddleware;
