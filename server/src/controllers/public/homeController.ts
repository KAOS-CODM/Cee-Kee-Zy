import type { Request, Response } from 'express';
import { getHomeData } from '@/services/listingService';
import { renderHomeView } from '@/views/pages/home';

export async function renderHomePage(
  _req: Request,
  res: Response
): Promise<void> {

  const data = await getHomeData();
  console.log(data.featured[0]);
  console.log(data.recent[0]);

  res.send(renderHomeView(data));
}