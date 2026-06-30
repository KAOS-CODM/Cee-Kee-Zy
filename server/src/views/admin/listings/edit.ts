import { renderAdminLayout } from "@/views/admin/layout";
import { renderListingForm } from "@/views/components/listingForm";
import type { ListingData } from "@/views/types/listing";

export function renderEditListingPage(
    listing: ListingData
): string {

    return renderAdminLayout({

        title: "Edit Listing",

        currentPage: "listings",

        content: renderListingForm({

            action: `/admin/listings/edit/${listing._id}`,

            submitText: "Save Changes",

            listing,

        }),

    });

}