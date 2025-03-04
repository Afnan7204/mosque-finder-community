
import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export const LocationButton = ({ 
  onLocationFound, 
  className,
  variant = "default" 
}: LocationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFound(position.coords.latitude, position.coords.longitude);
        setIsLoading(false);
      },
      (err) => {
        let errorMessage = "Failed to get your location";
        
        if (err.code === 1) {
          errorMessage = "Location permission denied";
        } else if (err.code === 2) {
          errorMessage = "Location unavailable";
        } else if (err.code === 3) {
          errorMessage = "Location request timed out";
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  return (
    <div className="relative">
      <Button
        variant={variant}
        className={cn("flex items-center gap-2", className)}
        onClick={getLocation}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
        <span>Find Nearby</span>
      </Button>
      
      {error && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-2 bg-red-50 text-red-800 text-sm rounded-md shadow-md border border-red-200 animate-fade-in z-10">
          {error}
        </div>
      )}
    </div>
  );
};
