import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/product-details';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Product not found',
    };
  }

  return {
    title: `${product.name} | StyleNest`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}