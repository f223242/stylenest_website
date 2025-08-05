import Link from 'next/link';
import NewsletterSignup from './newsletter-signup';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
            <NewsletterSignup />
            <div className="text-center md:text-right md:col-span-2 space-y-2">
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
                 <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} StyleNest. All Rights Reserved.
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
}
