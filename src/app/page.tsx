import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const products = getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="relative text-center bg-secondary p-12 rounded-lg shadow-sm overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://placehold.co/800x600.png"
                alt="Stylish man"
                fill
                className="object-cover opacity-15 blur-sm"
                data-ai-hint="modern menswear"
            />
            <Image
                src="https://placehold.co/800x600.png"
                alt="Stylish woman"
                fill
                className="object-cover opacity-15 blur-sm"
                data-ai-hint="modern womenswear"
            />
        </div>
        <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-foreground bg-primary/80 backdrop-blur-sm inline-block px-4 py-2 rounded-md mb-4">
            StyleNest
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 bg-background/50 backdrop-blur-sm rounded-md p-2">
            Discover curated collections where style meets comfort. Your new favorite outfit awaits.
            </p>
            <Button asChild size="lg">
            <Link href="/category/all">
                View All Collections <ArrowRight className="ml-2" />
            </Link>
            </Button>
        </div>
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
