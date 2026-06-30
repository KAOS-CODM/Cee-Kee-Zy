import { Router } from 'express';
import { renderHomePage } from '../controllers/public/homeController';
import { renderCategoryPage } from '../controllers/public/categoryController';
import { renderSearchPage } from '../controllers/public/searchController';
import { renderListingPage } from '../controllers/public/listingController';
import { renderContactPage } from '../controllers/public/staticController';
import { renderAboutPage } from '../controllers/public/staticController';
import { robotsTxt } from '../controllers/public/seoController';
import { sitemapXml } from '../controllers/public/seoController';

export const publicRoutes = Router();

publicRoutes.get('/', renderHomePage);
publicRoutes.get('/houses', (req, res) => renderCategoryPage(req, res, 'House'));
publicRoutes.get('/lands', (req, res) => renderCategoryPage(req, res, 'Land'));
publicRoutes.get('/cars', (req, res) => renderCategoryPage(req, res, 'Car'));
publicRoutes.get('/other', (req, res) => renderCategoryPage(req, res, 'Other'));
publicRoutes.get('/search', renderSearchPage);
publicRoutes.get('/listing/:slug', renderListingPage);
publicRoutes.get('/contact', renderContactPage);
publicRoutes.get('/about', renderAboutPage);

publicRoutes.get('/sitemap.xml', sitemapXml);
publicRoutes.get('/robots.txt', robotsTxt);

