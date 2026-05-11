export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  tags?: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Beef Jerky', price: 15, tags: ['High Protein'], image: require('../assets/images/beef_jerky.png') },
  { id: '2', name: 'Salmon Skin Crisps', price: 12, tags: ['Omega 3'], image: require('../assets/images/salmon_skin.png') },
  { id: '3', name: 'Sweet Potato Chews', price: 8, tags: ['Vegan'], image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Chicken Breast Freeze Dried', price: 20, tags: ['Single Ingredient'], image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' },
  { id: '5', name: 'Bone Broth Pops', price: 5, tags: ['Hydrating'], image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80' },
];
