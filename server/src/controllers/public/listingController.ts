import type { Request, Response } from "express";

import {
    getListingBySlug,
    getRelatedListings
} from "../../services/listingService";

import { renderListingPage as renderListingView }
    from "../../views/pages/listing";

import { buildListingSeo } from "../../utils/seo";

export async function renderListingPage(
    req: Request,
    res: Response
): Promise<void> {

    const slug = String(req.params.slug ?? "");

    const listing = await getListingBySlug(slug, true);

    if (!listing) {
        res.status(404).send("Listing not found");
        return;
    }

    const related = await getRelatedListings(
        listing.category,
        listing.slug,
        4
    );

    const seo = buildListingSeo(
        req,
        listing,
        listing.slug
    );

    res.send(
        renderListingView({
            listing,
            related,
            seo
        })
    );
}