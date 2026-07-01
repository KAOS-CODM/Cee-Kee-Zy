import type { Listing } from '../../../models/Listing';

import { publicLayout } from "../../../views/layouts/publicLayout";
import { renderPropertyCard } from "../../../views/partials/propertyCard";

interface CategoryViewData {
    category: string,
    title: string;
    heading: string;
    description: string;
    listings: Listing[];
}

export function renderCategoryView(data: CategoryViewData): string {

    return publicLayout({

        seo:{
            title: data.title,
            
            description: data.description,
        },

        body: `

<section class="bg-blue-600 text-white">

    <div class="max-w-7xl mx-auto px-4 py-16">

        <h1 class="text-5xl font-bold mb-4">

            ${data.heading}

        </h1>

        <p class="text-lg opacity-90">

            ${data.description}

        </p>

    </div>

</section>
<section>
    <div class="mb-8 border-1-4 border-blue-600 pl-5">
        <h2 class="text-3xl font-bold md:text-4xl text-slate-900">
            Available Listings
        </h2>
        <p class="mt-2 text-slate-500 text-base">
            Browse through our latest verified properties in the ${data.category} category.
        </p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${data.listings.map(renderPropertyCard).join('')}
    </div>
</section>



`

    });

}