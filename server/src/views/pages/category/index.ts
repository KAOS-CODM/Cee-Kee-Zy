import type { Listing } from '@/models/Listing';

import { publicLayout } from "@/views/layouts/publicLayout";
import { renderPropertyCard } from "@/views/partials/propertyCard";

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
    <h1 class="text-5xl font-bold mb-4 text-center">Available Listings</h1>
    <div class="grid md:grid-cols-3 gap-6">
      ${data.listings.map(renderPropertyCard).join('')}
    </div>
</section>



`

    });

}