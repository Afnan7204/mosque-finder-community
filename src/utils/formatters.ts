
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  try {
    // Convert 24-hour format to 12-hour format
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    
    return `${hour12}:${minute} ${period}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return time;
  }
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const getNextPrayer = (prayerTimes: any): { name: string; time: string } | null => {
  if (!prayerTimes) return null;
  
  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr?.iqamah },
    { name: 'Dhuhr', time: prayerTimes.dhuhr?.iqamah },
    { name: 'Asr', time: prayerTimes.asr?.iqamah },
    { name: 'Maghrib', time: prayerTimes.maghrib?.iqamah },
    { name: 'Isha', time: prayerTimes.isha?.iqamah }
  ];
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeMinutes = currentHour * 60 + currentMinute;
  
  for (const prayer of prayers) {
    if (!prayer.time) continue;
    
    const [prayerHour, prayerMinute] = prayer.time.split(':').map(Number);
    const prayerTimeMinutes = prayerHour * 60 + prayerMinute;
    
    if (prayerTimeMinutes > currentTimeMinutes) {
      return prayer;
    }
  }
  
  // If no prayer is found later today, return the first prayer for tomorrow
  return prayers[0];
};

export const getDistance = (distance?: number): string => {
  if (distance === undefined) return '';
  
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)} m`;
  }
  
  return `${distance.toFixed(1)} km`;
};
