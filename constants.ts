
import { Apartment } from './types';

export const APARTMENTS: Apartment[] = [
  {
    id: '1',
    name: '2-Bedroom Apartment — Wuse',
    location: 'Wuse, Abuja, Nigeria',
    description: 'A masterpiece of modern design featuring Italian marble floors, floor-to-ceiling windows, and a dedicated workspace.',
    priceRange: '₦80,000 – ₦100,000 per night',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    name: '1-Bedroom Studio — Maitama',
    location: 'Maitama, Abuja, Nigeria',
    description: 'Chic urban living with high-thread-count linens, ambient smart lighting, and an integrated kitchenette.',
    priceRange: '₦50,000 – ₦70,000 per night',
    imageUrl: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    name: '3-Bedroom Suite — Garki',
    location: 'Garki, Abuja, Nigeria',
    description: 'Spacious family-oriented layout with a private balcony, gourmet kitchen, and 24/7 concierge access.',
    priceRange: '₦120,000 – ₦150,000 per night',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200'
  }
];

export const BRAND_COLORS = {
  primary: '#c9a45c', 
  bgDark: '#0a0a0a',
  bgCard: '#141414',
};

export const CONTACT_INFO = {
  phone: '+234 800 000 0000',
  email: 'inquiries@jcklinehomes.com',
  location: 'Abuja, Nigeria',
  whatsapp: '2348000000000',
  socials: {
    instagram: 'https://instagram.com/jcklinehomes',
    facebook: 'https://facebook.com/jcklinehomes',
    linkedin: 'https://linkedin.com/company/jcklinehomes'
  }
};
