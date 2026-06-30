import type { Express } from "express";
import { Readable } from "stream";
import cloudinary from "../config/cloudinary";

function uploadSingleImage(
    file: Express.Multer.File,
    folder: string
): Promise<string> {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder,

                resource_type: "image",

                format: "webp",

                transformation: [

                    {
                        width: 1600,
                        height: 1600,
                        crop: "limit"
                    },

                    {
                        quality: "auto"
                    },

                    {
                        fetch_format: "auto"
                    }

                ]

            },

            (error, result) => {
            
                console.log("Cloudinary callback error:");
                console.dir(error, { depth: null });
            
                console.log("Cloudinary callback result:");
                console.dir(result, { depth: null });
            
                if (error) return reject(error);
                if (!result) return reject(new Error("Cloudinary upload failed."));
            
                resolve(result.secure_url);
            }

        );

        Readable
            .from(file.buffer)
            .pipe(stream);

    });

}

export async function uploadListingImages(

    files: Express.Multer.File[],

    category: string

): Promise<string[]> {

    if (!files.length)
        return [];

    const folder = `micah-property/${category}`;

    return Promise.all(

        files.map(file =>

            uploadSingleImage(
                file,
                folder
            )

        )

    );

}