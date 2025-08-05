import { type Product, type Category } from './types';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Tops', slug: 'tops' },
  { name: 'Bottoms', slug: 'bottoms' },
  { name: 'Accessories', slug: 'accessories' },
];


export const getProducts = async (categorySlug?: string): Promise<Product[]> => {
    const productsCol = collection(db, 'products');
    let q;
    if (categorySlug && categorySlug !== 'all') {
        q = query(productsCol, where("category", "==", categorySlug));
    } else {
        q = query(productsCol);
    }
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Product));
    return productList;
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
