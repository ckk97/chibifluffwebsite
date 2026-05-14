export interface Money {
  amount: number;
  currency: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: Money;
  imageUrl?: string;
  image?: any; // For local assets in mocks
  tags?: string[];
  isPork: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Premium Beef Jerky', 
    basePrice: { amount: 15, currency: 'MYR' }, 
    tags: ['High Protein'], 
    isPork: false, 
    image: require('../assets/images/beef_jerky.png') 
  },
  { 
    id: '2', 
    name: 'Salmon Skin Crisps', 
    basePrice: { amount: 12, currency: 'MYR' }, 
    tags: ['Omega 3'], 
    isPork: false, 
    image: require('../assets/images/salmon_skin.png') 
  },
  { 
    id: '3', 
    name: 'Sweet Potato Chews', 
    basePrice: { amount: 8, currency: 'MYR' }, 
    tags: ['Vegan'], 
    isPork: false, 
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: '4', 
    name: 'Chicken Breast Freeze Dried', 
    basePrice: { amount: 20, currency: 'MYR' }, 
    tags: ['Single Ingredient'], 
    isPork: false, 
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: '5', 
    name: 'Bone Broth Pops', 
    basePrice: { amount: 5, currency: 'MYR' }, 
    tags: ['Hydrating'], 
    isPork: false, 
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80' 
  },
];
