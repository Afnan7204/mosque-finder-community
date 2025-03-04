
import { useState } from "react";
import { Mosque, PrayerTimes } from "@/lib/types";
import { MosqueCard } from "./MosqueCard";
import { MapView } from "@/components/map/MapView";
import { SearchBar } from "@/components/common/SearchBar";
import { LocationButton } from "@/components/common/LocationButton";
import { List, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MosqueListProps {
  mosques: Mosque[];
  prayerTimes: PrayerTimes[];
  onSearch: (query: string, filters: { school?: string }) => void;
  onLocationFound: (latitude: number, longitude: number) => void;
  isLoading?: boolean;
  className?: string;
}

export const MosqueList = ({
  mosques,
  prayerTimes,
  onSearch,
  onLocationFound,
  isLoading = false,
  className,
}: MosqueListProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMosqueId, setSelectedMosqueId] = useState<string | undefined>(undefined);
  
  const getPrayerTimesForMosque = (mosqueId: string) => {
    return prayerTimes.find(pt => pt.mosqueId === mosqueId);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 space-y-4">
        <SearchBar onSearch={onSearch} />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span>List</span>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4" />
              <span>Map</span>
            </Button>
          </div>
          
          <LocationButton 
            onLocationFound={onLocationFound} 
            variant="outline"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="w-full py-12 flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Finding mosques...</p>
        </div>
      ) : mosques.length === 0 ? (
        <div className="w-full py-12 text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No mosques found</p>
          <p className="text-sm">Try adjusting your search or location</p>
        </div>
      ) : viewMode === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all animate-fade-in">
          {mosques.map((mosque) => (
            <MosqueCard
              key={mosque.id}
              mosque={mosque}
              prayerTimes={getPrayerTimesForMosque(mosque.id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[70vh] w-full rounded-lg overflow-hidden shadow-elegant border border-border animate-fade-in">
          <MapView 
            mosques={mosques} 
            selectedMosqueId={selectedMosqueId}
            onMosqueSelect={setSelectedMosqueId}
          />
        </div>
      )}
    </div>
  );
};
