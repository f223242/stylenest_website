import { type Product, type Category } from './types';

const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Tops', slug: 'tops' },
  { name: 'Bottoms', slug: 'bottoms' },
  { name: 'Accessories', slug: 'accessories' },
];

const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 2800, // Sale price
    originalPrice: 3500, // Original price
    image: '/images/Screenshot_20240406_21274.jpg',
    description: 'A timeless wardrobe staple, this classic white tee is made from 100% premium cotton for ultimate comfort and a perfect fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Tops',
  },
  {
    id: '2',
    name: 'Vintage Denim Jeans',
    price: 8500,
    image: '/images/1.jpg',
    description: 'Perfectly faded vintage-wash denim jeans with a modern slim fit. Comfortable, stylish, and built to last.',
    sizes: ['28', '30', '32', '34', '36'],
    category: 'Bottoms',
  },
  {
    id: '3',
    name: 'Sage Green Hoodie',
    price: 5000, // Sale price
    originalPrice: 7000, // Original price
    image: '/images/2.jpg',
    description: 'Stay cozy in our signature sage green hoodie. Made from a soft fleece blend, it features a relaxed fit and a minimalist design.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
  },
  {
    id: '4',
    name: 'Leather Belt',
    price: 4500,
    image: '/images/3.jpg',
    description: 'A versatile and durable accessory, this genuine leather belt with a classic silver buckle will complete any outfit.',
    sizes: ['One Size'],
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Linen Button-Up Shirt',
    price: 5000,
    image: '/images/4.jpg',
    description: 'Lightweight and breathable, this linen button-up shirt is perfect for warm weather. Available in a natural off-white color.',
    sizes: ['S', 'M', 'L'],
    category: 'Tops',
  },
  {
    id: '6',
    name: 'Black Chino Shorts',
    price: 5000,
    image: 'https://placehold.co/600x600.png',
    description: 'Smart and comfortable, these black chino shorts are a summer essential. Tailored for a clean, modern look.',
    sizes: ['28', '30', '32', '34'],
    category: 'Bottoms',
  },
  {
    id: '7',
    name: 'Canvas Tote Bag',
    price: 2500, // Sale price
    originalPrice: 3000, // Original price
    image: 'https://placehold.co/600x600.png',
    description: 'A sturdy and stylish canvas tote bag, perfect for daily use. Features our subtle "StyleNest" logo.',
    sizes: ['One Size'],
    category: 'Accessories',
  },
  {
    id: '8',
    name: 'Crewneck Sweatshirt',
    price: 6500,
    image: 'https://placehold.co/600x600.png',
    description: 'A classic dark grey crewneck sweatshirt. The perfect layering piece for any season, offering both warmth and style.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
  },
];

export const getProducts = (categorySlug?: string): Product[] => {
  if (categorySlug && categorySlug !== 'all') {
    const categoryName = getCategoryBySlug(categorySlug)?.name;
    return products.filter(p => p.category === categoryName);
  }
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getCategories = (): Category[] => {
  return categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
}
