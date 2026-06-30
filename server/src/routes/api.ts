import { Router } from 'express';
import { 
    apiGetListingBySlug,
    apiSearch, 
    apiCreateListing, 
    apiUpdateListing, 
    apiDeleteListing, 
    apiGetListings } from '@/controllers/api/listingsController';
import { uploadImages } from '@/middleware/uploadMulter';
import { requireAdminAuth } from '@/middleware/authRequired';
import { adminLogin, adminLogout } from '@/controllers/api/adminAuthController';

export const apiRoutes = Router();

apiRoutes.get('/listings', apiGetListings);
apiRoutes.get('/listings/:slug', apiGetListingBySlug);
apiRoutes.get('/search', apiSearch);
apiRoutes.get('/admin/logout', adminLogout);

// Admin protected REST endpoints
apiRoutes.post('/listings', requireAdminAuth, uploadImages.array('images', 6), apiCreateListing);
apiRoutes.put('/listings/:id', requireAdminAuth, uploadImages.array('images', 6), apiUpdateListing);
apiRoutes.delete('/listings/:id', requireAdminAuth, apiDeleteListing);

apiRoutes.post('/admin/login', adminLogin);