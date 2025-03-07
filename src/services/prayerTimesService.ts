
import { supabase } from "@/integrations/supabase/client";
import { PrayerTimes } from "@/lib/types";

export const getPrayerTimesByMosque = async (mosqueId: string, date?: string): Promise<PrayerTimes[]> => {
  let query = supabase
    .from("prayer_times")
    .select("*")
    .eq("mosque_id", mosqueId);
  
  if (date) {
    query = query.eq("date", date);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
  
  return data.map((item) => ({
    mosqueId: item.mosque_id,
    date: item.date,
    fajr: item.fajr as { adhan: string; iqamah: string },
    dhuhr: item.dhuhr as { adhan: string; iqamah: string },
    asr: item.asr as { adhan: string; iqamah: string },
    maghrib: item.maghrib as { adhan: string; iqamah: string },
    isha: item.isha as { adhan: string; iqamah: string },
    jummah: item.jummah as { khutbah: string; prayer: string }[] | undefined
  }));
};

export const createPrayerTime = async (prayerTime: PrayerTimes): Promise<void> => {
  const { error } = await supabase.from("prayer_times").insert({
    mosque_id: prayerTime.mosqueId,
    date: prayerTime.date,
    fajr: prayerTime.fajr,
    dhuhr: prayerTime.dhuhr,
    asr: prayerTime.asr,
    maghrib: prayerTime.maghrib,
    isha: prayerTime.isha,
    jummah: prayerTime.jummah
  });
  
  if (error) {
    console.error("Error creating prayer time:", error);
    throw error;
  }
};

export const updatePrayerTime = async (prayerTime: PrayerTimes): Promise<void> => {
  const { error } = await supabase
    .from("prayer_times")
    .update({
      fajr: prayerTime.fajr,
      dhuhr: prayerTime.dhuhr,
      asr: prayerTime.asr,
      maghrib: prayerTime.maghrib,
      isha: prayerTime.isha,
      jummah: prayerTime.jummah
    })
    .eq("mosque_id", prayerTime.mosqueId)
    .eq("date", prayerTime.date);
  
  if (error) {
    console.error("Error updating prayer time:", error);
    throw error;
  }
};

export const deletePrayerTime = async (mosqueId: string, date: string): Promise<void> => {
  const { error } = await supabase
    .from("prayer_times")
    .delete()
    .eq("mosque_id", mosqueId)
    .eq("date", date);
  
  if (error) {
    console.error("Error deleting prayer time:", error);
    throw error;
  }
};
