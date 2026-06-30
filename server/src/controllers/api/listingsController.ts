import type { Request, Response } from 'express';
import {
  getListingBySlug,
  searchListings,
  createListing,
  updateListingById,
  deleteListingById,
  listAdmin,
} from '../../services/listingService';

import {
  ListingCreateSchema,
  ListingUpdateSchema,
  SearchQuerySchema,
} from '../../utils/validation';

import { uploadListingImages } from '../../services/cloudinaryUpload';

export async function apiGetListings(req: Request, res: Response): Promise<void> {
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 10);

  const data = await listAdmin({
    q: req.query.q as string | undefined,
    category: req.query.category as string | undefined,
    status: req.query.status as string | undefined,
    sort: req.query.sort as string | undefined,
    page,
    pageSize,
  });

  res.json(data);
}

export async function apiGetListingBySlug(req: Request, res: Response): Promise<void> {
  const listing = await getListingBySlug(req.params.slug);

  if (!listing) {
    res.status(404).json({
      error: 'Listing not found',
    });
    return;
  }

  res.json({ listing });
}

export async function apiSearch(req: Request, res: Response): Promise<void> {
  const parsed = SearchQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.flatten(),
    });
    return;
  }

  const results = await searchListings({
    ...parsed.data,
    onlyPublished: true,
  });

  res.json({ results });
}

export async function apiCreateListing(req: Request, res: Response): Promise<void> {
  const parsed = ListingCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.flatten(),
    });
    return;
  }

  /*const images = Array.isArray((req as any).uploadedFiles)
    ? (req as any).uploadedFiles.map((f: any) => `/uploads/${f.filename}`)
    : Array.isArray(req.body.images)
      ? req.body.images
      : [];*/
  /*const images = await uploadListingImages(
    (req.files as Express.Multer.File[]) ?? [],
    req.body.category
  );

  const created = await createListing({
    ...parsed.data,
    images,
  });*/
  let images: string[] = [];
  
  try {
      images = await uploadListingImages(
          (req.files as Express.Multer.File[]) ?? [],
          req.body.category
      );
  } catch (err) {
      console.error("Cloudinary Error:", err);
  
      res.status(500).json({
          error: "Failed to upload images."
      });
      return;
  }
  
  const created = await createListing({
      ...parsed.data,
      images,
  });

  res.status(201).json({
    listing: created,
  });
}

export async function apiUpdateListing(
    req: Request,
    res: Response
): Promise<void> {

    const parsed = ListingUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({
            error: parsed.error.flatten(),
        });
        return;
    }

    let images: string[] | undefined;

    try {

        images = (req.files as Express.Multer.File[])?.length
            ? await uploadListingImages(
                  req.files as Express.Multer.File[],
                  req.body.category
              )
            : undefined;

        console.log(images);

    } catch (err) {

        console.error("Cloudinary Error:");
        console.error(err);
        throw err;

    }

    const updated = await updateListingById(req.params.id, {
        ...parsed.data,
        images,
    });

    res.json({
        listing: updated,
    });
}

export async function apiDeleteListing(req: Request, res: Response): Promise<void> {
  await deleteListingById(req.params.id);

  res.status(204).send();
}