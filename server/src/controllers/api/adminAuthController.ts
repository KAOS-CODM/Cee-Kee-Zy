import type { Request, Response } from 'express';
import { verifyAdminLogin } from '../../services/adminService';

export async function adminLogin(req: Request, res: Response): Promise<void> {
  const email = String(req.body.email ?? '');
  const password = String(req.body.password ?? '');

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  try {
    const token = await verifyAdminLogin(email, password);

    // 🔥 CRITICAL FIX: store in cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(err.status || 401).json({ error: err.message });
  }
}

export function adminLogout(req: Request, res: Response): void {
  res.clearCookie('admin_token');
  res.json({ success: true });
}