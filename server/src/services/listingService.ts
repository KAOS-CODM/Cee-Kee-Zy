import { listingRepository } from "@/repositories/listingRepository";
import { slugifyTitle } from "@/utils/slugify";
import { sanitizeText } from "@/utils/xss";

export async function createListing(input: {
    title: string;
    category: "House" | "Land" | "Car" | "Other";
    price: number;
    location: string;
    description: string;
    images: string[];
    featured?: boolean;
    status: "Published" | "Draft";
}) {

    const title = sanitizeText(input.title);

    const baseSlug = slugifyTitle(title);

    if (!baseSlug)
        throw Object.assign(
            new Error("Invalid title"),
            { status: 400 }
        );

    let slug = baseSlug;
    let counter = 0;

    while (await listingRepository.existsBySlug(slug)) {
        counter++;
        slug = `${baseSlug}-${counter}`;
    }

    return listingRepository.create({
        ...input,
        title,
        slug,
        location: sanitizeText(input.location),
        description: sanitizeText(input.description),
        featured: input.featured ?? false,
    });

}

export async function updateListingById(
    id: string,
    input: Partial<{
        title: string;
        category: "House" | "Land" | "Car" | "Other";
        price: number;
        location: string;
        description: string;
        images: string[];
        featured: boolean;
        status: "Published" | "Draft";
    }>
) {

    const existing =
        await listingRepository.findById(id);

    if (!existing)
        throw Object.assign(
            new Error("Listing not found"),
            { status: 404 }
        );

    const updateData: any = {};

    if (input.title !== undefined) {

        const cleanTitle =
            sanitizeText(input.title);

        updateData.title = cleanTitle;

        if (cleanTitle !== existing.title) {

            const baseSlug =
                slugifyTitle(cleanTitle);

            let slug = baseSlug;
            let counter = 0;

            while (
                await listingRepository.existsBySlugExceptId(
                    slug,
                    String(existing._id)
                )
            ) {

                counter++;
                slug = `${baseSlug}-${counter}`;

            }

            updateData.slug = slug;

        }

    }

    if (input.category !== undefined)
        updateData.category = input.category;

    if (input.price !== undefined)
        updateData.price = input.price;

    if (input.location !== undefined)
        updateData.location =
            sanitizeText(input.location);

    if (input.description !== undefined)
        updateData.description =
            sanitizeText(input.description);

    if (input.images !== undefined)
        updateData.images = input.images;

    if (input.featured !== undefined)
        updateData.featured = input.featured;

    if (input.status !== undefined)
        updateData.status = input.status;

    return listingRepository.update(
        id,
        updateData
    );

}

export async function getListingForAdminById(
    id: string
) {
    return listingRepository.findById(id);
}


export async function deleteListingById(id: string) {

    const deleted =
        await listingRepository.delete(id);

    if (!deleted)
        throw Object.assign(
            new Error("Listing not found"),
            { status: 404 }
        );

}

export async function getListingBySlug(
    slug: string,
    onlyPublished = true
) {

    return listingRepository.findBySlug(
        slug,
        onlyPublished
    );

}

export async function searchListings(params: {
    q?: string;
    category?: string;
    location?: string;
    onlyPublished?: boolean;
}) {

    const {
        q,
        category,
        location,
        onlyPublished = true
    } = params;

    const query: any = {};

    if (onlyPublished) {
        query.status = "Published";
    }

    if (category) {
        query.category = category;
    }

    if (location) {
        query.location = {
            $regex: location,
            $options: "i"
        };
    }

    if (q) {

        const number = Number(q);

        query.$or = [

            {
                title: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                slug: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                category: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                location: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                description: {
                    $regex: q,
                    $options: "i"
                }
            }

        ];

        if (!Number.isNaN(number)) {

            query.$or.push({
                price: number
            });

        }

    }

    return listingRepository.search(query);

}

export async function getHomeData() {

    return {

        featured:
            await listingRepository.featured(),

        recent:
            await listingRepository.recent()

    };

}

export async function listByCategory(
    category: string,
    onlyPublished = true,
    limit = 50,
    skip = 0
) {

    return listingRepository.byCategory(
        category,
        limit,
        skip
    );

}

export async function getRelatedListings(
    category: string,
    currentSlug: string,
    limit = 4
) {

    return listingRepository.related(
        category,
        currentSlug,
        limit
    );

}

export async function listAdmin(params: {
    q?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
}) {

    const {
        q,
        category,
        status,
        sort = "-createdAt",
        page = 1,
        pageSize = 10
    } = params;

    const query: any = {};

    if (category)
        query.category = category;

    if (status)
        query.status = status;

    if (q) {

        query.$or = [

            {
                title: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                location: {
                    $regex: q,
                    $options: "i"
                }
            },

            {
                slug: {
                    $regex: q,
                    $options: "i"
                }
            }

        ];

    }

    return listingRepository.listAdmin(
        query,
        sort,
        page,
        pageSize
    );

}

export async function getListingForAdminBySlug(
    slug: string
) {

    return listingRepository.findBySlug(
        slug,
        false
    );

}