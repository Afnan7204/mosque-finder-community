
import { supabase } from "@/integrations/supabase/client";
import { Mosque } from "@/lib/types";

export const getMosqueById = async (id: string): Promise<Mosque | null> => {
  const { data, error } = await supabase
    .from("mosques")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error("Error fetching mosque:", error);
    if (error.code === "PGRST116") {
      // Mosque not found
      return null;
    }
    throw error;
  }
  
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    coordinates: data.coordinates,
    school: data.school as "Shafi'i" | "Hanafi" | "Maliki" | "Hanbali" | "Other",
    facilities: data.facilities || [],
    contactNumber: data.contactnumber,
    email: data.email,
    website: data.website,
    image: data.image
  };
};

export const getMosques = async (limit?: number): Promise<Mosque[]> => {
  let query = supabase
    .from("mosques")
    .select("*")
    .eq("isapproved", true);
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching mosques:", error);
    throw error;
  }
  
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    city: item.city,
    state: item.state,
    country: item.country,
    coordinates: item.coordinates,
    school: item.school as "Shafi'i" | "Hanafi" | "Maliki" | "Hanbali" | "Other",
    facilities: item.facilities || [],
    contactNumber: item.contactnumber,
    email: item.email,
    website: item.website,
    image: item.image
  }));
};

export const updateMosque = async (mosque: Partial<Mosque> & { id: string }): Promise<void> => {
  const { error } = await supabase
    .from("mosques")
    .update({
      name: mosque.name,
      address: mosque.address,
      city: mosque.city,
      state: mosque.state,
      country: mosque.country,
      coordinates: mosque.coordinates,
      school: mosque.school,
      facilities: mosque.facilities,
      contactnumber: mosque.contactNumber,
      email: mosque.email,
      website: mosque.website,
      image: mosque.image
    })
    .eq("id", mosque.id);
  
  if (error) {
    console.error("Error updating mosque:", error);
    throw error;
  }
};
