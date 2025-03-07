
import { supabase } from "@/integrations/supabase/client";
import { Announcement } from "@/lib/types";

export const getAnnouncementsByMosque = async (mosqueId: string): Promise<Announcement[]> => {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("mosque_id", mosqueId)
    .order("dateposted", { ascending: false });
  
  if (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
  
  return data.map((item) => ({
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
};

export const createAnnouncement = async (announcement: Omit<Announcement, "id">): Promise<string> => {
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      mosque_id: announcement.mosqueId,
      title: announcement.title,
      content: announcement.content,
      dateposted: announcement.datePosted || new Date().toISOString(),
      expirydate: announcement.expiryDate,
      type: announcement.type,
      eventdate: announcement.eventDate,
      eventtime: announcement.eventTime
    })
    .select("id")
    .single();
  
  if (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
  
  return data.id;
};

export const updateAnnouncement = async (announcement: Announcement): Promise<void> => {
  const { error } = await supabase
    .from("announcements")
    .update({
      title: announcement.title,
      content: announcement.content,
      expirydate: announcement.expiryDate,
      type: announcement.type,
      eventdate: announcement.eventDate,
      eventtime: announcement.eventTime
    })
    .eq("id", announcement.id);
  
  if (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
};
