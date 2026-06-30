import type { ListingCategory, ListingStatus } from "@/models/Listing";
import type { Types } from "mongoose";

export interface ListingData {
    _id?: string | Types.ObjectId;

    title: string;
    slug: string;

    category: ListingCategory;

    price: number;

    location: string;

    description: string;

    images: string[];

    featured: boolean;

    status: ListingStatus;

    createdAt?: Date;

    updatedAt?: Date;
}

export interface ListingCreateInput {
    title: string;
    category: ListingCategory;
    price: number;
    location: string;
    description: string;
    images: string[];
    featured?: boolean;
    status: ListingStatus;
}

export interface ListingUpdateInput {
    title?: string;
    category?: ListingCategory;
    price?: number;
    location?: string;
    description?: string;
    images?: string[];
    featured?: boolean;
    status?: ListingStatus;
}

export interface ListingSearchOptions {
    q?: string;
    category?: ListingCategory | "";
    location?: string;
    onlyPublished?: boolean;
}

export interface AdminListingSearch {
    q?: string;
    category?: ListingCategory | "";
    status?: ListingStatus | "";
    sort?: string;
    page?: number;
    pageSize?: number;
}

export interface PaginatedListings {
    total: number;
    items: ListingData[];
}