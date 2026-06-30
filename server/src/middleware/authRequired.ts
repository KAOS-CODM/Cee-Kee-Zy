import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function requireAdminAuth(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const token = req.cookies.admin_token;

    if (!token) {

        res.redirect("/admin/login");
        return;

    }

    const secret = process.env.JWT_ADMIN_SECRET;

    if (!secret) {

        res.status(500).send("JWT_ADMIN_SECRET is missing.");
        return;

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

        next();

    } catch {

        res.clearCookie("admin_token");
        res.redirect("/admin/login");

    }

}