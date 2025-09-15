import { Sparkles, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
              <h3 className="font-serif text-2xl font-bold text-card-foreground">
                Summary <span className="text-accent">Goodies</span>
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Premium workspace essentials crafted for the modern professional. 
              Elevate your productivity with our sophisticated Summary Automates collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-products">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-shipping">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span data-testid="footer-whatsapp">+91 7666395733</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <span data-testid="footer-email">hello@summarygoodies.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span data-testid="footer-location">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
              © 2024 Summary Goodies. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-muted-foreground hover:text-accent transition-colors text-sm" data-testid="footer-link-privacy">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-accent transition-colors text-sm" data-testid="footer-link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}