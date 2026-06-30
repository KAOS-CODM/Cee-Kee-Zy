import type { Request } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser';

export async function verifyAdminLogin(email: string, password: string): Promise<string> {
  const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const secret = process.env.JWT_ADMIN_SECRET;
  if (!secret) throw Object.assign(new Error('Server misconfigured'), { status: 500 });

  const token = jwt.sign({ sub: user._id.toString(), email: user.email }, secret, { expiresIn: '7d' });
  return token;
}

/**
 * Used by server-rendered admin pages.
 * Matches the token extraction/verification performed in `requireAdminAuth` middleware.
 */
export async function ensureAdminAllowed(req: Request): Promise<void> {

    const token = req.cookies.admin_token;

    if (!token) {
        throw Object.assign(new Error("Unauthorized"), {
            status: 401,
        });
    }

    const secret = process.env.JWT_ADMIN_SECRET;

    if (!secret) {
        throw Object.assign(new Error("Server misconfigured"), {
            status: 500,
        });
    }

    try {

        const payload = jwt.verify(token, secret) as {
            sub: string;
            email: string;
        };

        (req as any).admin = {
            userId: payload.sub,
            email: payload.email,
        };

    } catch {

        throw Object.assign(new Error("Unauthorized"), {
            status: 401,
        });

    }

}