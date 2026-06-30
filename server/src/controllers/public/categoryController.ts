import type { Request, Response } from 'express';
import { listByCategory } from '@/services/listingService';
import { renderCategoryView } from '@/views/pages/category';

export async function renderCategoryPage(
  req: Request,
  res: Response,
  category: 'House' | 'Car' | 'Land' | 'Other'
): Promise<void> {
  const listings = await listByCategory(category, true, 50, 0);

const categoryContent = {
    House: {
        title: "Houses for Sale & Rent",
        heading: "Find Your Dream Home",
        description:
            "Browse quality houses for sale and rent across Nigeria. From apartments to detached homes, discover properties that match your lifestyle and budget."
    },

    Land: {
        title: "Land Listings",
        heading: "Invest in Land",
        description:
            "Explore residential, commercial and agricultural land opportunities in prime locations across Nigeria."
    },

    Car: {
        title: "Cars for Sale",
        heading: "Quality Vehicles",
        description:
            "Browse verified cars from trusted sellers. Find affordable, luxury and commercial vehicles in one place."
    },

    Other: {
        title: "Other Properties",
        heading: "Browse More Listings",
        description:
            "Explore additional property listings available on CEE-KEE-ZY Listing."
    }
};

const content = categoryContent[category];

res.send(
    renderCategoryView({
        category,
        title: content.title,
        heading: content.heading,
        description: content.description,
        listings
    })
);
}