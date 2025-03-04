
import { useEffect, useRef, useState } from "react";
import { Mosque } from "@/lib/types";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapViewProps {
  mosques: Mosque[];
  selectedMosqueId?: string;
  onMosqueSelect?: (mosqueId: string) => void;
  className?: string;
}

export const MapView = ({ 
  mosques, 
  selectedMosqueId, 
  onMosqueSelect,
  className 
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real implementation, we would use a mapping library like Mapbox or Google Maps
    // For this demo, we'll just show a placeholder
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      ref={mapRef} 
      className={cn(
        "relative w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-border bg-background",
        className
      )}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {/* This is a placeholder for the actual map */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50">
            <img 
              src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/74.7944,13.0068,13,0/800x600?access_token=pk.placeholder" 
              alt="Map placeholder" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          {/* Mosque pins */}
          <div className="absolute inset-0 pointer-events-none">
            {mosques.map((mosque) => (
              <button
                key={mosque.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
                  "transition-all duration-300 hover:scale-110 focus:outline-none focus:scale-110",
                  mosque.id === selectedMosqueId ? "z-10" : "z-0"
                )}
                style={{
                  // Position pins randomly for placeholder
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                onClick={() => onMosqueSelect?.(mosque.id)}
                aria-label={`Select ${mosque.name}`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-colors",
                      mosque.id === selectedMosqueId
                        ? "bg-mosque text-white scale-125"
                        : "bg-white text-mosque hover:bg-mosque/10"
                    )}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  {mosque.id === selectedMosqueId && (
                    <div className="mt-1 px-2 py-1 bg-white rounded-md shadow-elegant text-xs font-medium animate-fade-in">
                      {mosque.name}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Controls placeholder */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button className="w-8 h-8 bg-white rounded-md shadow-elegant flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
              <span>+</span>
            </button>
            <button className="w-8 h-8 bg-white rounded-md shadow-elegant flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
              <span>−</span>
            </button>
          </div>
          
          {/* Disclaimer for placeholder */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
            Map placeholder - will integrate with real map API
          </div>
        </>
      )}
    </div>
  );
};
