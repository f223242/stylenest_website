import { getCategoryBySlug, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product-card';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const products = await getProducts(params.slug);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No products found in this category. Make sure you have added them to your Firestore database.</p>
      )}
    </div>
  );
}
