
import { Link } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { Mosque, PrayerTimes } from "@/lib/types";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";

interface MosqueCardProps {
  mosque: Mosque;
  prayerTimes?: PrayerTimes;
  className?: string;
}

export const MosqueCard = ({ mosque, prayerTimes, className }: MosqueCardProps) => {
  // Get current time to compare with prayer times
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
  
  // Find the next prayer time
  const getNextPrayer = () => {
    if (!prayerTimes) return null;
    
    const prayers = [
      { name: "Fajr", time: prayerTimes.fajr.iqamah },
      { name: "Dhuhr", time: prayerTimes.dhuhr.iqamah },
      { name: "Asr", time: prayerTimes.asr.iqamah },
      { name: "Maghrib", time: prayerTimes.maghrib.iqamah },
      { name: "Isha", time: prayerTimes.isha.iqamah },
    ];
    
    // Sort prayers to find the next one
    const nextPrayer = prayers.find(prayer => prayer.time > currentTime);
    
    return nextPrayer || prayers[0]; // return first prayer of next day if all prayers passed
  };
  
  const nextPrayer = getNextPrayer();
  
  // Format time to 12-hour format
  const formatTime = (time24: string) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };
  
  return (
    <Link
      to={`/mosque/${mosque.id}`}
      className={cn(
        "block bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-300 transform hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-48">
        <img
          src={mosque.image || "/placeholder.svg"}
          alt={mosque.name}
          className="w-full h-full object-cover image-fade-mask"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="primary" size="sm">{mosque.school}</Badge>
          {mosque.facilities.includes("Women's Section") && (
            <Badge variant="secondary" size="sm">Women's Section</Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg truncate">{mosque.name}</h3>
          <div className="flex items-center mt-1 text-white/90 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{mosque.address}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Clock className="h-4 w-4 mr-1.5" />
          <span className="mr-2">Next prayer:</span>
          {nextPrayer ? (
            <span className="font-medium text-foreground">
              {nextPrayer.name} {formatTime(nextPrayer.time)}
            </span>
          ) : (
            <span className="text-muted-foreground italic">Not available</span>
          )}
        </div>
        
        {mosque.distance && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{mosque.distance} km away</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
          <div className="text-sm flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1.5" />
            <span>Community space</span>
          </div>
          <span className="text-sm text-primary font-medium hover:underline">View Details</span>
        </div>
      </div>
    </Link>
  );
};
