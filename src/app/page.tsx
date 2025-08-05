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
      <section className="relative text-left p-12 rounded-lg shadow-sm overflow-hidden min-h-[400px] flex items-center">
        <Image
            src="https://storage.googleapis.com/project-chat-prod-images/images/p0k270yv1r07u9.png"
            alt="Fashion models"
            fill
            className="object-cover"
            data-ai-hint="fashion editorial"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                StyleNest
            </h1>
            <p className="text-xl max-w-lg mb-8">
                Discover curated collections where style meets comfort. Your new favorite outfit awaits.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
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
