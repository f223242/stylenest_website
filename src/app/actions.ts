'use server';

import { getStyleSuggestions, type StyleSuggestionsInput } from '@/ai/flows/style-suggestions';
import { type CartItem } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function getSuggestionsAction(input: StyleSuggestionsInput): Promise<string[]> {
  if (input.cartItems.length === 0) return [];
  try {
    const result = await getStyleSuggestions(input);
    return result.suggestions;
  } catch (error) {
    console.error('Error getting style suggestions:', error);
    return [];
  }
}

export type ShippingInfo = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
}

export async function saveOrderAction(shippingInfo: ShippingInfo, cart: CartItem[]) {
    try {
        await addDoc(collection(db, "orders"), {
            shippingInfo,
            items: cart.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                size: item.size,
                quantity: item.quantity,
                price: item.product.price
            })),
            total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error saving order:", error);
        // In a real app, you'd want to handle this more gracefully
        throw new Error("Could not save order.");
    }
}
