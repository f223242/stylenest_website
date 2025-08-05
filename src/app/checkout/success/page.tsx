'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // We clear the cart after the user has been sent to their email client
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Please complete sending the email to place your order. We will process it as soon as we receive it.
      </p>
      <Button asChild size="lg">
        <Link href="/category/all">Continue Shopping</Link>
      </Button>
    </div>
  );
}
