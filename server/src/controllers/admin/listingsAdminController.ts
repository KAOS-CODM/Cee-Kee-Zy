import type { Request, Response } from 'express';
import { listAdmin, updateListingById, createListing, deleteListingById } from '../../services/listingService';
import { ListingCreateSchema, ListingUpdateSchema } from '../../utils/validation';
import { uploadListingImages } from '../../services/cloudinaryUpload';

export async function adminGetListings(req: Request, res: Response): Promise<void> {
  const { q, category, status, sort, page, pageSize } = req.query;
  const data = await listAdmin({
    q: typeof q === 'string' ? q : undefined,
    category: typeof category === 'string' ? category : undefined,
    status: typeof status === 'string' ? status : undefined,
    sort: typeof sort === 'string' ? sort : undefined,
    page: typeof page === 'string' ? Number(page) : 1,
    pageSize: typeof pageSize === 'string' ? Number(pageSize) : 10,
  });
  res.json(data);
}

export async function adminCreate(req: Request, res: Response): Promise<void> {
  const parsed = ListingCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  /*const images = (req as any).uploadedFiles
    ? (req as any).uploadedFiles.map((f: any) => `/uploads/${f.filename}`)
    : [];*/

  const files = ((req as any).files ?? []) as Express.Multer.File[];

  const images = await uploadListingImages(
    files,
    req.body.category
  );

  const listing = await createListing({ ...parsed.data, images });
  res.status(201).json({ listing });
}

export async function adminUpdate(req: Request, res: Response): Promise<void> {
  const parsed = ListingUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  /*const images = (req as any).uploadedFiles
    ? (req as any).uploadedFiles.map((f: any) => `/uploads/${f.filename}`)
    : undefined;*/

  const files = ((req as any).files ?? []) as Express.Multer.File[];

  /*const images = files.length
    ? await uploadListingImages(
      files,
      req.body.category
    )
    : undefined;

  const listing = await updateListingById(req.params.id, { ...parsed.data, images });*/
  let images: string[] | undefined;
  
  try {
      images = files.length
          ? await uploadListingImages(
                files,
                req.body.category
            )
          : undefined;
  
      console.log(images);
  
  } catch (err) {
      console.error("Cloudinary Error:");
      console.error(err);
      throw err;
  }
  
  const listing = await updateListingById(req.params.id, {
      ...parsed.data,
      images,
  });
  res.json({ listing });
}

export async function adminDelete(req: Request, res: Response): Promise<void> {
  await deleteListingById(req.params.id);
  res.status(204).send();
}

