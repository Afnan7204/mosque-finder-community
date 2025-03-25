
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { MosqueList } from "@/components/mosque/MosqueList";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mosque } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { searchMosques, getNearestMosques } from "@/lib/mosqueData";
import { getMosques } from "@/services/mosqueService";
import { SearchBar } from "@/components/common/SearchBar";

const Mosques = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMosqueId, setSelectedMosqueId] = useState<string | undefined>(undefined);
  
  // Load all mosques from the database
  useEffect(() => {
    const fetchMosques = async () => {
      try {
        setIsLoading(true);
        const allMosques = await getMosques();
        setMosques(allMosques);
      } catch (error) {
        console.error("Error fetching mosques:", error);
        toast({
          title: "Error",
          description: "Failed to load mosques. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMosques();
  }, [toast]);
  
  const handleSearch = async (query: string, filters: { school?: string, womensSection?: boolean }) => {
    setIsLoading(true);
    
    try {
      // For now, we'll use the mock data search function
      // In a real app, this would call the API
      const results = searchMosques(query, filters.school, filters.womensSection);
      setMosques(results);
    } catch (error) {
      console.error("Error searching mosques:", error);
      toast({
        title: "Search Failed",
        description: "There was an error searching mosques. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLocationFound = (latitude: number, longitude: number) => {
    setIsLoading(true);
    
    // For demo, use the mock location-based search
    // In a real app, this would use the latitude/longitude with the API
    setTimeout(() => {
      const nearbyMosques = getNearestMosques(latitude, longitude);
      setMosques(nearbyMosques);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <Container>
          <h1 className="text-3xl font-semibold mb-8">All Mosques</h1>
          
          <div className="mb-6 space-y-4">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex items-center justify-between">
              <MosqueList
                mosques={mosques}
                prayerTimes={[]} // We would fetch actual prayer times in a real app
                onSearch={handleSearch}
                onLocationFound={handleLocationFound}
                isLoading={isLoading}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedMosqueId={selectedMosqueId}
                setSelectedMosqueId={setSelectedMosqueId}
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mosques;
