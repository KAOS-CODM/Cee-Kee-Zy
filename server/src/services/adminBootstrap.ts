import bcrypt from 'bcrypt';
import { AdminUser } from '../models/AdminUser';


export async function ensureDefaultAdmin(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secretConfigured = Boolean(process.env.JWT_ADMIN_SECRET);
  if (!email || !password || !secretConfigured) return;

  const existing = await AdminUser.findOne({ email: email.toLowerCase().trim() });
  if (existing) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.create({ email, passwordHash });
}

