import { z } from 'zod';

export const ListingCreateSchema = z.object({
  title: z.string().min(2).max(120),
  category: z.enum(['House', 'Land', 'Car', 'Other']),
  price: z.number().nonnegative(),
  location: z.string().min(2).max(80),
  description: z.string().min(10).max(5000),
  featured: z.boolean().optional().default(false),
  status: z.enum(['Published', 'Draft']),
});

export const ListingUpdateSchema = ListingCreateSchema.partial().extend({
  title: z.string().min(2).max(120).optional(),
  price: z.number().nonnegative().optional(),
  location: z.string().min(2).max(80).optional(),
  description: z.string().min(10).max(5000).optional(),
  featured: z.boolean().optional(),
  status: z.enum(['Published', 'Draft']).optional(),
});

export const SearchQuerySchema = z.object({
  q: z.string().trim().min(1).max(80).optional(),
  category: z.enum(['House', 'Land', 'Car', 'Other']).optional(),
  location: z.string().trim().min(1).max(80).optional(),
});

