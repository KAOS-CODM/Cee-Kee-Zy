import type { Request, Response } from "express";

import { searchListings } from "../../services/listingService";

import { renderSearchView } from "../../views/pages/search";

export async function renderSearchPage(
    req: Request,
    res: Response
): Promise<void> {

    const q =
        typeof req.query.q === "string"
            ? req.query.q
            : "";

    const category =
        typeof req.query.category === "string"
            ? req.query.category
            : undefined;

    const results = await searchListings({

        q: q || undefined,

        category,

        onlyPublished: true

    });

    res.send(

        renderSearchView({

            results,

            q,

            category

        })

    );

}