import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProducts } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const products = getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="text-center bg-secondary p-12 rounded-lg shadow-sm">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-foreground bg-primary inline-block px-4 py-2 rounded-md mb-4">
          StyleNest
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover curated collections where style meets comfort. Your new favorite outfit awaits.
        </p>
        <Button asChild size="lg">
          <Link href="/category/all">
            View All Collections <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
