import { renderAdminLayout } from "@/views/admin/layout";
import { renderListingForm } from "@/views/components/listingForm";

export function renderCreateListingPage() {

    return renderAdminLayout({

        title: "Create Listing",

        currentPage: "create",

        content: renderListingForm({

            action: "/admin/listings/create",

            submitText: "Create Listing",

        }),

    });

}