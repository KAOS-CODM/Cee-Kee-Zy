import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createRateLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import { connectMongo } from './config/mongo';
import { ensureDefaultAdmin } from './services/adminBootstrap';
import { publicRoutes } from './routes/public';
import { apiRoutes } from './routes/api';
import { adminRoutes } from './routes/admin';
import { seedListings } from './services/seedListings';
import { enableMockDatabase } from './config/databaseMode';

export const app = express();

// Trust proxy if deployed behind reverse proxy
app.set('trust proxy', 1);

// Helmet defaults include a strict CSP that blocks inline scripts.
// Admin login uses an inline script for its submit handler, so disable CSP only.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(createRateLimiter());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Serve uploaded files
const uploadDir = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : path.resolve('uploads');
app.use('/uploads', express.static(uploadDir));

// Static client assets
const clientDist = path.resolve(__dirname, '..', '..', 'client');
app.use('/static', express.static(clientDist));

app.use('/', publicRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

(async ()=> {
  try {
    await connectMongo();
    await ensureDefaultAdmin();

    console.log("[database] Connected to MongoDB");
  }catch (err) {
    console.error("[database] MongoDB unavailable.");
    console.error(err);
    console.warn("[database] Switching to mock database");

    enableMockDatabase();
  }

  await seedListings();

})();