'use client';

import { useEffect, useState, useTransition } from 'react';
import { useCart } from '@/context/cart-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { getSuggestionsAction } from '@/app/actions';

export default function StyleSuggestions() {
  const { cart } = useCart();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cart.length > 0) {
      startTransition(async () => {
        const itemNames = cart.map((item) => item.product.name);
        const result = await getSuggestionsAction({
          cartItems: itemNames,
          recentlyViewedItems: [], // This can be extended in the future
        });
        setSuggestions(result);
      });
    } else {
      setSuggestions([]);
    }
  }, [cart]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 text-primary" />
          AI Style Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No suggestions available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
