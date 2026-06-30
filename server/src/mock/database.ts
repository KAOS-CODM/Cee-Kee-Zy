import type { Listing } from "../models/Listing";

export interface MockListing extends Listing {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const mockDatabase = {
    listings: [] as MockListing[],
};