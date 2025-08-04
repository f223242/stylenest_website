import { type Product, type Category } from './types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Tops', slug: 'tops' },
  { name: 'Bottoms', slug: 'bottoms' },
  { name: 'Accessories', slug: 'accessories' },
];

export const getProducts = async (categorySlug?: string): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  let productsQuery;

  if (categorySlug && categorySlug !== 'all') {
    // Note: Firestore queries are case-sensitive. Ensure the category in the database matches.
    // For this to work, you may need to create an index in Firestore. 
    // The console will provide a link to create it if it's missing.
    const categoryName = categories.find(c => c.slug === categorySlug)?.name;
    if (categoryName) {
        productsQuery = query(productsCollection, where("category", "==", categoryName));
    } else {
        return []; // Or handle as a "not found" case
    }
  } else {
    productsQuery = query(productsCollection);
  }

  const productsSnapshot = await getDocs(productsQuery);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  return productsList;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  } else {
    return undefined;
  }
};

export const getCategories = (): Category[] => {
  return categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
}
