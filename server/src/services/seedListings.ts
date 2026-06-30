import { listingRepository } from '@/repositories/listingRepository';

export async function seedListings(): Promise<void> {

  const count = await listingRepository.count();
  
  if (count > 0) {
    console.log(`[seed] ${count} listings already exist.`);
    return;
  }
  
  console.log('[seed] Creating demo listings...');

  const demoListings = [
    {
      title: 'Luxury Duplex in Abuja',
      slug: 'luxury-duplex-in-abuja',
      category: 'House' as const,
      price: 185000000,
      location: 'Maitama, Abuja',
      description:
        'A luxury five-bedroom duplex with swimming pool, spacious compound and modern finishes.',
      images: ['/static/images/demo-house.jpeg'],
      featured: true,
      status: 'Published' as const,
    },
    {
      title: 'Modern 4 Bedroom Bungalow',
      slug: 'modern-4-bedroom-bungalow',
      category: 'House' as const,
      price: 78000000,
      location: 'Lokogoma, Abuja',
      description:
        'Well-finished bungalow in a secured estate with ample parking.',
      images: ['/static/images/demo-house.jpeg'],
      featured: true,
      status: 'Published' as const,
    },
    {
      title: '600sqm Residential Land',
      slug: '600sqm-residential-land',
      category: 'Land' as const,
      price: 28000000,
      location: 'Lugbe, Abuja',
      description:
        'Dry residential plot with registered title documents.',
      images: ['/static/images/demo-land.jpeg'],
      featured: false,
      status: 'Published' as const,
    },
    {
      title: 'Estate Plot in Gwarinpa',
      slug: 'estate-plot-in-gwarinpa',
      category: 'Land' as const,
      price: 45000000,
      location: 'Gwarinpa, Abuja',
      description:
        'Prime estate land suitable for residential development.',
      images: ['/static/images/demo-land.jpeg'],
      featured: true,
      status: 'Published' as const,
    },
    {
      title: 'Toyota Corolla 2022',
      slug: 'toyota-corolla-2022',
      category: 'Car' as const,
      price: 21500000,
      location: 'Abuja',
      description:
        'Foreign used Toyota Corolla with excellent condition.',
      images: ['/static/images/demo-car.jpeg'],
      featured: false,
      status: 'Published' as const,
    },
    {
      title: 'Lexus RX350',
      slug: 'lexus-rx350',
      category: 'Car' as const,
      price: 39500000,
      location: 'Abuja',
      description:
        'Accident-free Lexus RX350 with full options.',
      images: ['/static/images/demo-car.jpeg'],
      featured: true,
      status: 'Published' as const,
    },
    {
      title: 'Commercial Shop Space',
      slug: 'commercial-shop-space',
      category: 'Other' as const,
      price: 32000000,
      location: 'Wuse II, Abuja',
      description:
        'Commercial shop in a busy business district.',
      images: ['/static/images/demo.jpeg'],
      featured: false,
      status: 'Published' as const,
    },
    {
      title: 'Office Complex',
      slug: 'office-complex',
      category: 'Other' as const,
      price: 275000000,
      location: 'Central Business District, Abuja',
      description:
        'Three-storey office complex suitable for corporate use.',
      images: ['/static/images/demo.jpeg'],
      featured: false,
      status: 'Published' as const,
    },
  ];
  
  for (const listing of demoListings) {
    await listingRepository.create(listing);
  }

  console.log(`[seed] ${demoListings.length} demo listings created.`);
}