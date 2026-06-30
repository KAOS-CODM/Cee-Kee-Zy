import crypto from "node:crypto";

import { ListingModel } from "../models/Listing";
import { useMockDatabase } from "../config/databaseMode";
import { mockDatabase, MockListing } from "../mock/database";
import { isMongoConnected } from "../config/databaseState";

function usingMock() {
    return useMockDatabase || !isMongoConnected();
}

export const listingRepository = {

    async count() {

        if (usingMock()) {
            return mockDatabase.listings.length;
        }

        return ListingModel.countDocuments();
    },

    async create(data: any) {

        if (usingMock()) {

            const listing = {
                ...data,
                _id: crypto.randomUUID(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockDatabase.listings.push(listing as any);

            return listing;
        }

        return ListingModel.create(data);
    },

    async findById(id: string) {

        if (usingMock()) {

            return (
                mockDatabase.listings.find(
                    (x: any) => x._id === id
                ) ?? null
            );

        }

        return ListingModel.findById(id);
    },

    async update(
        id: string,
        data: any
    ) {
    
        if (usingMock()) {
    
            const listing = mockDatabase.listings.find(
                (x: any) => x._id === id
            );
    
            if (!listing)
                return null;
    
            Object.assign(
                listing,
                data,
                {
                    updatedAt: new Date()
                }
            );
    
            return listing;
    
        }
    
        return ListingModel.findByIdAndUpdate(
            id,
            {
                $set: data
            },
            {
                new: true,
                runValidators: true
            }
        );
    
    },

    async existsBySlug(slug: string) {

        if (usingMock()) {

            return mockDatabase.listings.some(
                (x) => x.slug === slug
            );

        }

        return !!(await ListingModel.exists({ slug }));
    },

    async existsBySlugExceptId(
        slug: string,
        id: string
    ) {

        if (usingMock()) {

            return mockDatabase.listings.some(
                (x: any) =>
                    x.slug === slug &&
                    x._id !== id
            );

        }

        return !!(
            await ListingModel.exists({
                slug,
                _id: { $ne: id },
            })
        );
    },

    async findBySlug(
        slug: string,
        publishedOnly = true
    ) {

        if (usingMock()) {

            return (
                mockDatabase.listings.find(
                    (x) =>
                        x.slug === slug &&
                        (!publishedOnly ||
                            x.status === "Published")
                ) ?? null
            );

        }

        const query: any = { slug };

        if (publishedOnly) {
            query.status = "Published";
        }

        return ListingModel.findOne(query).lean();
    },

    async featured(limit = 6) {

        if (usingMock()) {

            return mockDatabase.listings
                .filter(
                    (x) =>
                        x.featured &&
                        x.status === "Published"
                )
                .slice(0, limit);

        }

        return ListingModel.find({
            featured: true,
            status: "Published",
        })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .lean();
    },

    async recent(limit = 6) {

        if (usingMock()) {

            return [...mockDatabase.listings]
                .filter(
                    (x) =>
                        x.status === "Published"
                )
                .sort(
                    (a: any, b: any) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                )
                .slice(0, limit);

        }

        return ListingModel.find({
            status: "Published",
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
    },

    async byCategory(
        category: string,
        limit = 50,
        skip = 0
    ) {

        if (usingMock()) {

            return mockDatabase.listings
                .filter(
                    (x) =>
                        x.category === category &&
                        x.status === "Published"
                )
                .slice(skip, skip + limit);

        }

        return ListingModel.find({
            category,
            status: "Published",
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
    },

    async related(
        category: string,
        currentSlug: string,
        limit = 4
    ) {

        if (usingMock()) {

            return mockDatabase.listings
                .filter(
                    (x) =>
                        x.category === category &&
                        x.slug !== currentSlug &&
                        x.status === "Published"
                )
                .slice(0, limit);

        }

        return ListingModel.find({
            category,
            slug: { $ne: currentSlug },
            status: "Published",
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
    },

    async search(query: any) {
    
        if (usingMock()) {
    
            return mockDatabase.listings.filter(item => {
    
                if (query.status && item.status !== query.status)
                    return false;
    
                if (query.category && item.category !== query.category)
                    return false;
    
                if (query.location) {
    
                    const regex = new RegExp(
                        query.location.$regex,
                        "i"
                    );
    
                    if (!regex.test(item.location))
                        return false;
    
                }
    
                if (query.$or) {
    
                    const found = query.$or.some((condition: { [key: string]: any }) => {
    
                        const key = Object.keys(condition)[0] as keyof MockListing;
    
                        const value = condition[key];
    
                        if (key === "price") {
                            return item.price === value;
                        }
    
                        const regex = new RegExp(
                            value.$regex,
                            "i"
                        );
    
                        return regex.test(String(item[key] ?? ""));
    
                    });
    
                    if (!found)
                        return false;
    
                }
    
                return true;
    
            });
    
        }
    
        return ListingModel.find(query)
            .sort({
                featured: -1,
                createdAt: -1
            })
            .lean();
    
    },

    async delete(id: string) {

        if (usingMock()) {

            const index =
                mockDatabase.listings.findIndex(
                    (x: any) => x._id === id
                );

            if (index === -1) {
                return null;
            }

            return mockDatabase.listings.splice(
                index,
                1
            )[0];

        }

        return ListingModel.findByIdAndDelete(id);
    },

    async listAdmin(
        query: any,
        sort = "-createdAt",
        page = 1,
        pageSize = 10
    ) {

        if (usingMock()) {

            const items = [...mockDatabase.listings];

            return {
                total: items.length,
                items: items.slice(
                    (page - 1) * pageSize,
                    page * pageSize
                ),
            };

        }

        const total =
            await ListingModel.countDocuments(query);

        const items =
            await ListingModel.find(query)
                .sort(sort)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .lean();

        return {
            total,
            items,
        };
    }

};