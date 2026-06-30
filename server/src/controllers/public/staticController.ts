import type { Request, Response } from 'express';
import { renderAboutView } from '../../views/pages/about';
import { renderContactView } from '../../views/pages/contact';

export async function renderContactPage(
  _req: Request, 
  res: Response
): Promise<void> {
res.send(renderContactView());
}

export async function renderAboutPage(
  _req: Request,
  res: Response
): Promise<void> {
res.send(renderAboutView());
}

