'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StyleSuggestions from '@/components/style-suggestions';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/category/all">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.product.id}-${item.size}`} className="flex items-center p-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden mr-4">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="object-cover"
                    data-ai-hint={`${item.product.category} ${item.product.name.split(' ').slice(0,1).join(' ')}`}
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="font-bold">{item.product.name}</h2>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm font-bold text-primary">PKR {item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id, item.size)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>PKR {subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <StyleSuggestions />
          </div>
        </div>
      )}
    </div>
  );
}
