export type PetType = 'Dog' | 'Cat';

export interface Review {
  id: string;
  petName: string;
  petType: PetType;
  rating: number; // 1-5
  comment: string;
  imageUri: string;
  isPetApproved: boolean;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    petName: 'Mochi',
    petType: 'Dog',
    rating: 5,
    comment: 'The treats are so fluffy and yummy! My tail hasn\'t stopped wagging since the box arrived. 10/10 would bark again!',
    imageUri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '2',
    petName: 'Luna',
    petType: 'Cat',
    rating: 4,
    comment: 'I am very picky, but these salmon bites are acceptable. The packaging is fun to sit in too.',
    imageUri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: false,
  },
  {
    id: '3',
    petName: 'Biscuit',
    petType: 'Dog',
    rating: 5,
    comment: 'Perfect for my sensitive tummy. And the hand-drawn stickers in the box are so cute!',
    imageUri: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '4',
    petName: 'Oliver',
    petType: 'Cat',
    rating: 5,
    comment: 'Meow! The chicken jerky is to die for. I even shared some with my dog brother (don\'t tell anyone).',
    imageUri: 'https://images.unsplash.com/photo-1533733506639-5095384bc1f1?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '5',
    petName: 'Daisy',
    petType: 'Dog',
    rating: 5,
    comment: 'I love the watercolor aesthetic of the brand. It matches my personality perfectly!',
    imageUri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '6',
    petName: 'Simba',
    petType: 'Cat',
    rating: 3,
    comment: 'Good, but I wish there were more catnip flavored options. Still, very high quality.',
    imageUri: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: false,
  },
  {
    id: '7',
    petName: 'Rocky',
    petType: 'Dog',
    rating: 5,
    comment: 'The beef jerky is intense! I hide them in my bed for later. Best treats ever.',
    imageUri: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '8',
    petName: 'Bella',
    petType: 'Dog',
    rating: 5,
    comment: 'I look forward to the Chibi box every month. It\'s the highlight of my week!',
    imageUri: 'https://images.unsplash.com/photo-1510771463140-7a736589f237?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '9',
    petName: 'Milo',
    petType: 'Cat',
    rating: 4,
    comment: 'The chicken treats are crunchy and fresh. My humans say I look healthier too.',
    imageUri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: false,
  },
  {
    id: '10',
    petName: 'Cooper',
    petType: 'Dog',
    rating: 5,
    comment: 'Soft enough for my senior teeth but still super tasty. Thank you Chibi Fluff!',
    imageUri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '11',
    petName: 'Cleo',
    petType: 'Cat',
    rating: 5,
    comment: 'Finally, a brand that treats cats with the same respect as dogs. The salmon is divine.',
    imageUri: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: true,
  },
  {
    id: '12',
    petName: 'Tucker',
    petType: 'Dog',
    rating: 4,
    comment: 'Woof! I love everything about this brand. The "Perfectly Imperfect" vibe is so me.',
    imageUri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1000&auto=format&fit=crop',
    isPetApproved: false,
  }
];
