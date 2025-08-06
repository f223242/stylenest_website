import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={`${product.category} ${product.name.split(' ')[0]}`}
            />
            {isOnSale && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Sale
              </Badge>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-body font-bold mb-2">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm">{product.category}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex items-baseline gap-2 self-start">
          <p className={`text-lg font-bold ${isOnSale ? 'text-destructive' : 'text-primary-foreground'}`}>
            PKR {product.price.toFixed(2)}
          </p>
          {isOnSale && (
            <p className="text-sm text-muted-foreground line-through">
              PKR {product.originalPrice?.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex gap-2 w-full justify-between">
          <Button asChild variant="secondary">
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>

          {/* ✅ WhatsApp Order Button */}
          <Link
            href={`https://wa.me/923110324007?text=Hi, I want to order the ${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
          >
            Order on WhatsApp
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
