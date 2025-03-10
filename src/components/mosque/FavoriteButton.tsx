
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isFavoriteMosque, toggleFavoriteMosque } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  mosqueId: string;
  variant?: "icon" | "button";
  onToggle?: (isFavorite: boolean) => void;
}

export const FavoriteButton = ({ 
  mosqueId, 
  variant = "icon",
  onToggle
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && mosqueId) {
        try {
          const status = await isFavoriteMosque(mosqueId);
          setIsFavorite(status);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [user, mosqueId]);
  
  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const newStatus = await toggleFavoriteMosque(mosqueId);
      setIsFavorite(newStatus);
      
      if (onToggle) {
        onToggle(newStatus);
      }
      
      toast({
        title: newStatus ? "Added to Favorites" : "Removed from Favorites",
        description: newStatus 
          ? "This mosque has been added to your favorites" 
          : "This mosque has been removed from your favorites",
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (variant === "icon") {
    return (
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
        />
      </button>
    );
  }
  
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={isFavorite ? "bg-primary text-primary-foreground" : ""}
    >
      <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-yellow-400" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  );
};
