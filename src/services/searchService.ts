
import { supabase } from "@/integrations/supabase/client";
import { Mosque } from "@/lib/types";

export const searchMosques = async (searchTerm: string): Promise<Mosque[]> => {
  try {
    if (!searchTerm.trim()) {
      const { data, error } = await supabase
        .from("mosques")
        .select("*")
        .eq("isapproved", true)
        .limit(20);
      
      if (error) {
        console.error("Error fetching mosques:", error);
        throw error;
      }
      
      return data.map(mapMosque);
    }
    
    const { data, error } = await supabase.rpc('search_mosques', {
      search_term: searchTerm
    });
    
    if (error) {
      console.error("Error searching mosques:", error);
      throw error;
    }
    
    return (data || []).map(mapMosque);
  } catch (error) {
    console.error("Error in searchMosques function:", error);
    throw error;
  }
};

export const getNearbyMosques = async (
  latitude: number, 
  longitude: number, 
  radiusKm: number = 10
): Promise<Mosque[]> => {
  try {
    const { data, error } = await supabase.rpc('get_nearby_mosques', {
      lat: latitude,
      lng: longitude,
      radius_km: radiusKm
    });
    
    if (error) {
      console.error("Error fetching nearby mosques:", error);
      throw error;
    }
    
    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      city: item.city,
      state: item.state,
      country: item.country,
      coordinates: item.coordinates as { latitude: number; longitude: number },
      school: item.school,
      facilities: item.facilities || [],
      contactNumber: item.contactnumber,
      email: item.email,
      website: item.website,
      image: item.image,
      distance: item.distance
    }));
  } catch (error) {
    console.error("Error in getNearbyMosques function:", error);
    throw error;
  }
};

// Helper function to map Supabase mosque data to our Mosque type
const mapMosque = (item: any): Mosque => ({
  id: item.id,
  name: item.name,
  address: item.address,
  city: item.city,
  state: item.state,
  country: item.country,
  coordinates: item.coordinates as { latitude: number; longitude: number },
  school: item.school,
  facilities: item.facilities || [],
  contactNumber: item.contactnumber,
  email: item.email,
  website: item.website,
  image: item.image
});
