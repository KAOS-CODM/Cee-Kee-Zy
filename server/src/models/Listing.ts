import mongoose, {
    Schema,
    HydratedDocument,
    InferSchemaType
} from "mongoose";

export type ListingCategory =
    | "House"
    | "Land"
    | "Car"
    | "Other";

export type ListingStatus =
    | "Published"
    | "Draft";

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        category: {
            type: String,
            enum: [
                "House",
                "Land",
                "Car",
                "Other"
            ],
            required: true,
            index: true
        },

        price: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        images: {
            type: [String],
            default: []
        },

        featured: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: [
                "Published",
                "Draft"
            ],
            default: "Published"
        }
    },
    {
        timestamps: true
    }
);

export type Listing =
    InferSchemaType<typeof listingSchema>;

export type ListingDocument =
    HydratedDocument<Listing>;

export const ListingModel =
    mongoose.model<Listing>(
        "Listing",
        listingSchema
    );