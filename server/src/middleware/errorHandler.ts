import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = typeof (err as { status?: number })?.status === 'number' ? (err as { status: number }).status : 500;
  const message = (err as { message?: string })?.message ?? 'Internal Server Error';
  res.status(status).json({ error: message });
}

