import { type Product, type Category } from './types';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Tops', slug: 'tops' },
  { name: 'Bottoms', slug: 'bottoms' },
  { name: 'Accessories', slug: 'accessories' },
];

// The products are now fetched from Firestore.
// You can go to your Firebase Console > Firestore Database to add/edit products.
// The old hardcoded product list is below for your reference.

/*
const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 2800, // Sale price
    originalPrice: 3500, // Original price
    image: '/images/classic-white-tee.png',
    description: 'A timeless wardrobe staple, this classic white tee is made from 100% premium cotton for ultimate comfort and a perfect fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Tops',
  },
  // ... other products
];
*/

export const getProducts = async (categorySlug?: string): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));

  if (categorySlug && categorySlug !== 'all') {
    return productsList.filter(p => p.category.toLowerCase() === categorySlug);
  }
  return productsList;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.id === id);
};

export const getCategories = (): Category[] => {
  return categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
}
