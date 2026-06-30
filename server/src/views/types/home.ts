import type { Listing } from '@/models/Listing';

export interface HomeViewData {
  featured: Listing[];
  recent: Listing[];
}