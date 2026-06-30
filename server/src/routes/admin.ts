import { Router } from 'express';
import { renderAdminLoginPage, renderAdminDashboardPage, renderAdminListingsPage, renderAdminCreatePage, renderAdminEditPage, submitCreateListing, submitEditListing, deleteListing } from '../controllers/admin/adminPagesController';
import { requireAdminAuth } from '../middleware/authRequired';
import { uploadImages } from '../middleware/uploadMulter';

export const adminRoutes = Router();

adminRoutes.get('/login', renderAdminLoginPage);

// HTML pages protected via admin_token cookie (set by /api/admin/login)
adminRoutes.get('/', requireAdminAuth, renderAdminDashboardPage);
adminRoutes.get('/listings', requireAdminAuth, renderAdminListingsPage);
adminRoutes.get('/listings/create', requireAdminAuth, renderAdminCreatePage);
adminRoutes.get('/listings/edit/:id', requireAdminAuth, renderAdminEditPage);

adminRoutes.post('/listings/create', requireAdminAuth, uploadImages.array('images', 6), submitCreateListing);
adminRoutes.post('/listings/edit/:id', requireAdminAuth, uploadImages.array('images', 6), submitEditListing);
adminRoutes.post('/listings/delete/:id', requireAdminAuth, deleteListing);