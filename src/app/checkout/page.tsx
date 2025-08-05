'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { saveOrderAction, type ShippingInfo } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "ZIP code is required"),
});


export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const { toast } = useToast();

  const form = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
    }
  });

  const onSubmit = async (data: ShippingInfo) => {
    if (cart.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await saveOrderAction(data, cart);
      router.push('/checkout/success');
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2 col-span-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
                 <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold">Payment Details</h3>
              <p className="text-sm text-muted-foreground">This is a mock checkout. No real payment will be processed.</p>
              
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" disabled />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" disabled />
                </div>
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
