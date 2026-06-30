import type { Listing } from "@/models/Listing";

import { publicLayout } from "@/views/layouts/publicLayout";

import { renderListingGallery } from "@/views/partials/listingGallery";
import { renderListingInfo } from "@/views/partials/listingInfo";
import { renderListingDescription } from "@/views/partials/listingDescription";
import { renderPropertyGrid } from "@/views/partials/propertyGrid";
import { SeoData } from "@/utils/seo";

interface ListingPageData {

    listing: Listing;

    related: Listing[];

    seo: SeoData;

}

export function renderListingPage(data: ListingPageData): string {

    return publicLayout({
        seo: data.seo,

        /*seo:{
            title: data.listing.title,
            
            description: data.listing.description,
        },*/

        body: `

${renderListingGallery(data.listing)}

${renderListingInfo(data.listing)}

${renderListingDescription(data.listing)}

${renderPropertyGrid({
    title: "Similar Properties",
    listings: data.related
})}

`

    });

}