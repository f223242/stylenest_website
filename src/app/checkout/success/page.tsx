'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        This is a demo store. To place an actual order, please contact us with the items you'd like to purchase.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/category/all">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
