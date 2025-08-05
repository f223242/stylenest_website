import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <p className="text-center text-lg text-muted-foreground mb-12">
        We'd love to hear from you! Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <a href="mailto:your-email@example.com" className="text-muted-foreground hover:underline">
                your-email@example.com
              </a>
              <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <a href="tel:+1234567890" className="text-muted-foreground hover:underline">
                +1 (234) 567-890
              </a>
               <p className="text-sm text-muted-foreground">Mon - Fri, 9am - 5pm</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
