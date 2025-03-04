
import { Link } from "react-router-dom";
import { MapPin, Mail, Github, Instagram, Twitter } from "lucide-react";
import { Container } from "@/components/ui/container";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-border mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-mosque"
            >
              <MapPin className="h-6 w-6" />
              <span className="font-semibold text-xl">MosqueLocator</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Helping Muslims find nearby mosques and access accurate prayer timings through community-driven data.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterSection title="Navigation">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/mosques">Find Mosques</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterSection>
            
            <FooterSection title="Resources">
              <FooterLink to="/register-mosque">Register a Mosque</FooterLink>
              <FooterLink to="/admin-login">Admin Login</FooterLink>
              <FooterLink to="/prayer-times">Prayer Time Calculator</FooterLink>
              <FooterLink to="/faq">FAQs</FooterLink>
            </FooterSection>
            
            <FooterSection title="Connect">
              <a 
                href="mailto:contact@mosquelocator.app" 
                className="text-muted-foreground hover:text-mosque transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </a>
              <div className="flex space-x-4 mt-3">
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-mosque transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-mosque transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-mosque transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </FooterSection>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} MosqueLocator. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-mosque transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-mosque transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-3">{title}</h3>
      <div className="flex flex-col space-y-2.5">
        {children}
      </div>
    </div>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <Link
      to={to}
      className="text-muted-foreground hover:text-mosque transition-colors"
    >
      {children}
    </Link>
  );
};
