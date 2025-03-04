
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "glass-nav py-3 shadow-elegant" 
          : "bg-transparent py-5"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 text-mosque font-medium text-xl transition-all hover:opacity-90"
          >
            <MapPin className="h-6 w-6 text-mosque" />
            <span className="font-semibold">MosqueLocator</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mosques">Find Mosques</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button size="sm" variant="outline" className="gap-2 rounded-full">
              <Bell className="h-4 w-4" />
              <span>Prayer Alerts</span>
            </Button>
            <Button size="sm" variant="default" className="gap-2 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>Near Me</span>
            </Button>
          </div>
          
          <button 
            className="md:hidden text-mosque"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-elegant-lg border-t border-border animate-fade-in">
          <Container className="py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/mosques" onClick={() => setIsMenuOpen(false)}>Find Mosques</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
              
              <div className="flex items-center space-x-3 pt-2">
                <Button size="sm" variant="outline" className="gap-2 w-full justify-center rounded-full">
                  <Bell className="h-4 w-4" />
                  <span>Prayer Alerts</span>
                </Button>
                <Button size="sm" variant="default" className="gap-2 w-full justify-center rounded-full">
                  <MapPin className="h-4 w-4" />
                  <span>Near Me</span>
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-foreground/80 hover:text-mosque transition-colors duration-200 font-medium",
        className
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-foreground/80 hover:text-mosque text-lg py-2 border-b border-border/50 transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
