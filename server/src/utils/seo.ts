import type { Request } from "express";

export interface SeoData {
    title: string;
    description: string;

    canonical?: string;
    image?: string;

    type?: string;

    noIndex?: boolean;
}

export function absoluteUrl(
    req: Request,
    path: string
): string {

    return `${req.protocol}://${req.get("host")}${path}`;
}

export function buildListingSeo(
    req: Request,
    listing: {
        title: string;
        description: string;
        images?: string[];
    },
    slug: string
): SeoData {

    return {

        title: `${listing.title} | CEE-KEE-ZY`,

        description:
            listing.description
                .replace(/\s+/g, " ")
                .slice(0, 160),

        canonical: absoluteUrl(
            req,
            `/listing/${slug}`
        ),

        image:
            listing.images?.[0]
            ? absoluteUrl(req, listing.images[0])
            : absoluteUrl(
                  req,
                  "/static/icons/favicon.ico"
              ),

        type: "article",

    };

}

/*import type { Request } from 'express';

export function absoluteUrl(req: Request, path: string): string {
  const origin = `${req.protocol}://${req.get('host')}`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

export function buildListingSeo(req: Request, listing: { title: string; description: string }, slug: string) {
  const canonical = absoluteUrl(req, `/listing/${slug}`);
  const metaDescription = listing.description.replace(/\s+/g, ' ').slice(0, 160);
  const titleTag = `${listing.title} | CEE-KEE-ZY`;

  return {
    titleTag,
    metaDescription,
    canonical,
    og: {
      title: titleTag,
      description: metaDescription,
      url: canonical,
    },
    twitter: {
      title: titleTag,
      description: metaDescription,
      url: canonical,
    },
  };
}

*/