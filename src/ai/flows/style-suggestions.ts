'use server';

/**
 * @fileOverview Provides style suggestions based on items in the cart or recently viewed.
 *
 * - getStyleSuggestions - A function that generates style suggestions.
 * - StyleSuggestionsInput - The input type for the getStyleSuggestions function.
 * - StyleSuggestionsOutput - The return type for the getStyleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleSuggestionsInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('List of item names currently in the user\'s cart.'),
  recentlyViewedItems: z
    .array(z.string())
    .describe('List of item names the user has recently viewed.'),
});
export type StyleSuggestionsInput = z.infer<typeof StyleSuggestionsInputSchema>;

const StyleSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('List of suggested items to complement the cart or viewed items.'),
});
export type StyleSuggestionsOutput = z.infer<typeof StyleSuggestionsOutputSchema>;

export async function getStyleSuggestions(input: StyleSuggestionsInput): Promise<StyleSuggestionsOutput> {
  return styleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleSuggestionsPrompt',
  input: {schema: StyleSuggestionsInputSchema},
  output: {schema: StyleSuggestionsOutputSchema},
  prompt: `You are a personal stylist for an online clothing store. Based on the items in the user's cart and recently viewed items, suggest other items that would complement their style and complete their look.

Cart Items: {{#each cartItems}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recently Viewed Items: {{#each recentlyViewedItems}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Suggestions:`, 
});

const styleSuggestionsFlow = ai.defineFlow(
  {
    name: 'styleSuggestionsFlow',
    inputSchema: StyleSuggestionsInputSchema,
    outputSchema: StyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
