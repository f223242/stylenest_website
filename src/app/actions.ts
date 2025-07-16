'use server';

import { getStyleSuggestions, type StyleSuggestionsInput } from '@/ai/flows/style-suggestions';

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
