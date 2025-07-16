export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Optional original price for sales
  image: string;
  description: string;
  sizes: string[];
  category: string;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export type Category = {
  name:string;
  slug: string;
};
