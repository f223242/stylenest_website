'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // In a real app, you would send this to your backend/email service
    // For now, we'll just simulate a successful signup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setEmail('');
    toast({
      title: 'Subscribed!',
      description: "Thanks for joining our newsletter. You'll be the first to know about new arrivals and sales.",
    });
  };

  return (
    <div>
        <h3 className="text-lg font-semibold mb-2">Join Our Newsletter</h3>
        <p className="text-muted-foreground mb-4">Get updates on new arrivals and special offers.</p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
            <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-label="Email for newsletter"
            />
            <Button type="submit" disabled={loading}>
                <Mail className="mr-2" />
                {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
        </form>
    </div>
  );
}
