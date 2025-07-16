'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Select a Size',
        description: 'Please select a size before adding to the cart.',
        variant: 'destructive',
      });
      return;
    }
    addToCart(product, selectedSize);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="aspect-square relative bg-card rounded-lg shadow-sm overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          data-ai-hint={`${product.category} ${product.name.split(' ').slice(0,1).join(' ')}`}
        />
         {isOnSale && (
            <Badge variant="destructive" className="absolute top-4 left-4 text-lg">
                Sale
            </Badge>
        )}
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <h1 className="text-4xl lg:text-5xl font-bold">{product.name}</h1>
        </div>
        <p className="text-lg text-foreground">{product.description}</p>
        <div className="flex items-baseline gap-4">
          <p className={`text-3xl font-bold ${isOnSale ? 'text-destructive' : 'text-primary'}`}>
            PKR {product.price.toFixed(2)}
          </p>
          {isOnSale && (
            <p className="text-xl text-muted-foreground line-through">
              PKR {product.originalPrice?.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
