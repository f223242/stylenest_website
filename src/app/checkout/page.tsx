'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

type ShippingInfo = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
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

  const onSubmit = (data: ShippingInfo) => {
    if (cart.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    // IMPORTANT: Replace this with your actual email address
    const recipientEmail = "your-email@example.com"; 
    const subject = "New Order from StyleNest";
    
    const cartDetails = cart.map(item => 
      `Product: ${item.product.name}\nSize: ${item.size}\nQuantity: ${item.quantity}\nPrice: PKR ${item.product.price.toFixed(2)}`
    ).join('\n\n');

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const body = `
New Order Details:

--- SHIPPING INFORMATION ---
Name: ${data.firstName} ${data.lastName}
Address: ${data.address}
City: ${data.city}
ZIP: ${data.zip}

--- ORDER SUMMARY ---
${cartDetails}

-----------------------------
Total: PKR ${subtotal.toFixed(2)}
    `;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's default email client
    window.location.href = mailtoLink;

    // Redirect to a success page after attempting to open mail client
    router.push('/checkout/success');
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

              <p className="text-sm text-muted-foreground">Clicking the button below will open your default email client to send the order details to us.</p>
              
              <Button type="submit" size="lg" className="w-full">
                 Send Order via Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
