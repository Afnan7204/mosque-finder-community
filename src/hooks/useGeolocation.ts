
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });
  const { toast } = useToast();

  const requestGeolocation = () => {
    setState(prev => ({ ...prev, loading: true }));
    
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      
      toast({
        title: "Location Not Available",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = "Failed to get your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to find mosques near you";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out";
            break;
        }
        
        setState({
          latitude: null,
          longitude: null,
          error: errorMessage,
          loading: false,
        });
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    );
  };

  useEffect(() => {
    // Don't automatically request on load to respect user privacy
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  return {
    ...state,
    requestGeolocation,
  };
};
