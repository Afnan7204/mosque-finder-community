
import { supabase } from "@/integrations/supabase/client";
import { Mosque, PrayerTimes, Announcement } from "@/lib/types";
import { formatDate } from "@/utils/formatters";

export const getMosqueWithDetails = async (mosqueId: string): Promise<{
  mosque: Mosque | null;
  prayerTimes: PrayerTimes | null;
  announcements: Announcement[];
}> => {
  try {
    // Get the mosque details
    const { data: mosque, error: mosqueError } = await supabase
      .from("mosques")
      .select("*")
      .eq("id", mosqueId)
      .eq("isapproved", true)
      .single();
    
    if (mosqueError) {
      if (mosqueError.code === "PGRST116") {
        // Mosque not found or not approved
        return { mosque: null, prayerTimes: null, announcements: [] };
      }
      throw mosqueError;
    }
    
    // Get the prayer times for today
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const { data: prayerTimesData, error: prayerTimesError } = await supabase.rpc(
      'get_prayer_times_for_date',
      { mosque_id: mosqueId, prayer_date: today }
    );
    
    if (prayerTimesError) {
      console.error("Error fetching prayer times:", prayerTimesError);
    }
    
    // Get the announcements
    const { data: announcementsData, error: announcementsError } = await supabase
      .from("announcements")
      .select("*")
      .eq("mosque_id", mosqueId)
      .gte("expirydate", new Date().toISOString())
      .order("dateposted", { ascending: false });
      
    if (announcementsError) {
      console.error("Error fetching announcements:", announcementsError);
    }
    
    // Map the mosque data to our Mosque type
    const mosqueData: Mosque = {
      id: mosque.id,
      name: mosque.name,
      address: mosque.address,
      city: mosque.city,
      state: mosque.state,
      country: mosque.country,
      coordinates: mosque.coordinates as { latitude: number; longitude: number },
      school: mosque.school,
      facilities: mosque.facilities || [],
      contactNumber: mosque.contactnumber,
      email: mosque.email,
      website: mosque.website,
      image: mosque.image
    };
    
    // Map the announcements data to our Announcement type
    const announcements: Announcement[] = (announcementsData || []).map((item) => ({
      id: item.id,
      mosqueId: item.mosque_id,
      title: item.title,
      content: item.content,
      datePosted: item.dateposted,
      expiryDate: item.expirydate,
      type: item.type as "general" | "event" | "eid" | "ramadan",
      eventDate: item.eventdate,
      eventTime: item.eventtime
    }));
    
    return {
      mosque: mosqueData,
      prayerTimes: prayerTimesData || null,
      announcements
    };
  } catch (error) {
    console.error("Error in getMosqueWithDetails:", error);
    throw error;
  }
};

export const isMosqueAdmin = async (mosqueId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('is_mosque_admin', {
      mosque_id: mosqueId
    });
    
    if (error) {
      console.error("Error checking mosque admin status:", error);
      return false;
    }
    
    return data;
  } catch (error) {
    console.error("Error in isMosqueAdmin function:", error);
    return false;
  }
};
