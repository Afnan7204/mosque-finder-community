
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { SearchBar } from "@/components/common/SearchBar";
import { LocationButton } from "@/components/common/LocationButton";
import { MosqueList } from "@/components/mosque/MosqueList";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mosque } from "@/lib/types";
import { mockMosques, mockPrayerTimes, searchMosques, getNearestMosques } from "@/lib/mosqueData";

const Index = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  // Initial load of some mosques
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setMosques(mockMosques.slice(0, 3));
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleSearch = (query: string, filters: { school?: string }) => {
    setIsLoading(true);
    setSearchPerformed(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchMosques(query, filters.school);
      setMosques(results);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleLocationFound = (latitude: number, longitude: number) => {
    setIsLoading(true);
    setSearchPerformed(true);
    
    // Simulate location-based search delay
    setTimeout(() => {
      const nearbyMosques = getNearestMosques(latitude, longitude);
      setMosques(nearbyMosques);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-blue-50">
        <Container className="px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" size="md" className="mb-4">Surathkal Region</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight animate-slide-down">
              Find Mosques <span className="text-mosque">&</span> Prayer Times
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-down animation-delay-100">
              Locate nearby mosques, get accurate prayer timings, and stay updated with community announcements.
            </p>
            
            <div className="max-w-xl mx-auto mb-8 animate-slide-up">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <LocationButton 
                onLocationFound={handleLocationFound}
                className="w-full sm:w-auto justify-center rounded-full px-6"
              />
              <Button 
                variant="outline" 
                className="w-full sm:w-auto justify-center rounded-full gap-2 px-6"
                asChild
              >
                <Link to="/mosques">
                  <Search className="h-4 w-4" />
                  <span>Browse All Mosques</span>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Mosque List Section */}
      <section className="py-16 bg-secondary/30">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">
              {searchPerformed ? "Search Results" : "Featured Mosques"}
            </h2>
            {!searchPerformed && (
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/mosques">
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          
          <MosqueList
            mosques={mosques}
            prayerTimes={mockPrayerTimes}
            onSearch={handleSearch}
            onLocationFound={handleLocationFound}
            isLoading={isLoading}
          />
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-mosque text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Are You a Mosque Administrator?</h2>
            <p className="text-white/90 mb-8">
              Register your mosque on our platform to keep your community updated with accurate prayer times and important announcements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-mosque hover:bg-white/90 rounded-full"
                asChild
              >
                <Link to="/admin/register-mosque">Register Your Mosque</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 rounded-full"
                asChild
              >
                <Link to="/admin/login">Admin Login</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
