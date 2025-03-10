
import { supabase } from "@/integrations/supabase/client";

export const toggleFavoriteMosque = async (mosqueId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('toggle_favorite_mosque', {
      mosque_id: mosqueId
    });
    
    if (error) {
      console.error("Error toggling favorite mosque:", error);
      throw error;
    }
    
    return data as boolean;
  } catch (error) {
    console.error("Error in toggleFavoriteMosque function:", error);
    throw error;
  }
};

export const getFavoriteMosques = async () => {
  try {
    const { data, error } = await supabase.rpc('get_favorite_mosques');
    
    if (error) {
      console.error("Error getting favorite mosques:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in getFavoriteMosques function:", error);
    throw error;
  }
};

export const isFavoriteMosque = async (mosqueId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('is_favorite', {
      mosque_id: mosqueId
    });
    
    if (error) {
      console.error("Error checking if mosque is favorite:", error);
      return false;
    }
    
    return data as boolean;
  } catch (error) {
    console.error("Error in isFavoriteMosque function:", error);
    return false;
  }
};

export const getUserPreferences = async () => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Error fetching user preferences:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in getUserPreferences function:", error);
    throw error;
  }
};

export const updateUserPreferences = async (preferences: {
  notificationEnabled?: boolean;
  defaultMosqueId?: string | null;
}) => {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        notification_enabled: preferences.notificationEnabled,
        default_mosque_id: preferences.defaultMosqueId,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });
    
    if (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in updateUserPreferences function:", error);
    throw error;
  }
};
