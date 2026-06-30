import type { Request, Response } from 'express';
import { listingRepository } from '@/repositories/listingRepository';

export async function sitemapXml(req: Request, res: Response): Promise<void> {
    const listings = await listingRepository.search({
        status: "Published",
    });

    const base = `${req.protocol}://${req.get("host")}`;

    const urls = listings
        .map((l: any) => {
            const lastmod = l.updatedAt
                ? new Date(l.updatedAt).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10);

            return `
<url>
    <loc>${base}/listing/${l.slug}</loc>
    <lastmod>${lastmod}</lastmod>
</url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${base}/</loc></url>
<url><loc>${base}/houses</loc></url>
<url><loc>${base}/lands</loc></url>
<url><loc>${base}/cars</loc></url>
<url><loc>${base}/search</loc></url>
${urls}
</urlset>`;

    res.type("application/xml").send(xml);
}

export function robotsTxt(req: Request, res: Response): void {
  const base = `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
}

