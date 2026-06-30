import type { Request, Response } from 'express';

import { renderDashboard } from "@/views/admin/dashboard";
import { listingRepository } from "@/repositories/listingRepository";

import { renderListingsPage } from "@/views/admin/listings";
import { renderCreateListingPage } from "@/views/admin/listings/create";
import { renderEditListingPage } from "@/views/admin/listings/edit";
import { renderAdminLoginPage as loginView } from "@/views/admin/login";
import { uploadListingImages } from "@/services/cloudinaryUpload";

import {
  getListingForAdminById,
  createListing,
  updateListingById,
  deleteListingById
} from "@/services/listingService";

// LOGIN PAGE
export async function renderAdminLoginPage(req: Request, res: Response): Promise<void> {
  res.status(200).send(loginView());
}

// DASHBOARD
export async function renderAdminDashboardPage(req: Request, res: Response): Promise<void> {

  const listings = await listingRepository.search({});

  res.send(renderDashboard({
    total: listings.length,
    published: listings.filter(x => x.status === "Published").length,
    drafts: listings.filter(x => x.status === "Draft").length,
    featured: listings.filter(x => x.featured).length,
  }));
}

// LISTINGS PAGE
export async function renderAdminListingsPage(req: Request, res: Response): Promise<void> {
  const listings = await listingRepository.search({});
  res.send(renderListingsPage({ listings }));
}

// CREATE PAGE
export async function renderAdminCreatePage(req: Request, res: Response): Promise<void> {
  res.send(renderCreateListingPage());
}

// EDIT PAGE
export async function renderAdminEditPage(req: Request, res: Response): Promise<void> {
  const listing = await getListingForAdminById(req.params.id);

  if (!listing) {
    res.status(404).send("Listing not found");
    return;
  }

  res.send(renderEditListingPage(listing));
}

// CREATE POST
export async function submitCreateListing(
    req: Request,
    res: Response
): Promise<void> {

    const files = ((req as any).files ?? []) as Express.Multer.File[];

    let images: string[] = [];

    try {

        images = await uploadListingImages(
            files,
            req.body.category
        );

        console.log(images);

    } catch (err) {

        console.error("Cloudinary Error:");
        console.error(err);
        throw err;

    }

    await createListing({
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        location: req.body.location,
        description: req.body.description,
        images,
        featured: req.body.featured === "on",
        status: req.body.status,
    });

    res.redirect("/admin/listings");
}

// EDIT POST
export async function submitEditListing(
    req: Request,
    res: Response
): Promise<void> {

    const files = ((req as any).files ?? []) as Express.Multer.File[];

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

    await updateListingById(req.params.id, {
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        location: req.body.location,
        description: req.body.description,
        images,
        featured: req.body.featured === "on",
        status: req.body.status,
    });

    res.redirect("/admin/listings");
}

// DELETE
export async function deleteListing(req: Request, res: Response): Promise<void> {
  await deleteListingById(req.params.id);
  res.redirect("/admin/listings");
}