
import { useState } from "react";
import { PrayerTimes as PrayerTimesType } from "@/lib/types";
import { Bell, BellOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PrayerTimesProps {
  prayerTimes: PrayerTimesType;
  className?: string;
}

export const PrayerTimes = ({ prayerTimes, className }: PrayerTimesProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Get current time to compare with prayer times
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
  
  // Format time to 12-hour format
  const formatTime = (time24: string) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };
  
  // Determine if a prayer is the next one
  const isNextPrayer = (iqamahTime: string) => {
    const prayers = [
      prayerTimes.fajr.iqamah,
      prayerTimes.dhuhr.iqamah,
      prayerTimes.asr.iqamah,
      prayerTimes.maghrib.iqamah,
      prayerTimes.isha.iqamah,
    ];
    
    // Sort prayers by time
    const nextPrayerIndex = prayers.findIndex(time => time > currentTime);
    
    if (nextPrayerIndex === -1) return false; // All prayers have passed
    
    return prayers[nextPrayerIndex] === iqamahTime;
  };
  
  // Toggle notifications
  const toggleNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    
    if (Notification.permission === "granted") {
      setNotificationsEnabled(!notificationsEnabled);
    } else if (Notification.permission !== "denied") {
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        new Notification("Prayer Notifications Enabled", {
          body: "You will now receive notifications for prayer times",
          icon: "/favicon.ico",
        });
      }
    }
  };
  
  const today = new Date().toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Check if today is Friday for Jummah
  const isFriday = new Date().getDay() === 5;
  
  return (
    <div className={cn("bg-card rounded-lg shadow-elegant overflow-hidden", className)}>
      <div className="bg-primary/5 p-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-lg">Prayer Times</h3>
          <span className="text-sm text-muted-foreground">{today}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Iqamah times shown below
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1.5 text-xs h-8",
              notificationsEnabled ? "text-mosque" : "text-muted-foreground"
            )}
            onClick={toggleNotifications}
          >
            {notificationsEnabled ? (
              <>
                <Bell className="h-3.5 w-3.5" />
                <span>Notifications On</span>
              </>
            ) : (
              <>
                <BellOff className="h-3.5 w-3.5" />
                <span>Notifications Off</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border/50">
              <th className="font-medium py-2 px-4">Prayer</th>
              <th className="font-medium py-2 px-4">Adhan</th>
              <th className="font-medium py-2 px-4">Iqamah</th>
            </tr>
          </thead>
          <tbody>
            <PrayerRow
              name="Fajr"
              adhan={prayerTimes.fajr.adhan}
              iqamah={prayerTimes.fajr.iqamah}
              isNext={isNextPrayer(prayerTimes.fajr.iqamah)}
              formatTime={formatTime}
            />
            {isFriday ? (
              <JummahRow
                jummahTimes={prayerTimes.jummah || []}
                formatTime={formatTime}
              />
            ) : (
              <PrayerRow
                name="Dhuhr"
                adhan={prayerTimes.dhuhr.adhan}
                iqamah={prayerTimes.dhuhr.iqamah}
                isNext={isNextPrayer(prayerTimes.dhuhr.iqamah)}
                formatTime={formatTime}
              />
            )}
            <PrayerRow
              name="Asr"
              adhan={prayerTimes.asr.adhan}
              iqamah={prayerTimes.asr.iqamah}
              isNext={isNextPrayer(prayerTimes.asr.iqamah)}
              formatTime={formatTime}
            />
            <PrayerRow
              name="Maghrib"
              adhan={prayerTimes.maghrib.adhan}
              iqamah={prayerTimes.maghrib.iqamah}
              isNext={isNextPrayer(prayerTimes.maghrib.iqamah)}
              formatTime={formatTime}
            />
            <PrayerRow
              name="Isha"
              adhan={prayerTimes.isha.adhan}
              iqamah={prayerTimes.isha.iqamah}
              isNext={isNextPrayer(prayerTimes.isha.iqamah)}
              formatTime={formatTime}
            />
          </tbody>
        </table>
      </div>
      
      <div className="p-3 bg-secondary/50 border-t border-border text-xs text-muted-foreground flex items-start gap-2">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <p>Prayer times may change. Please confirm with the mosque for any updates or special circumstances.</p>
      </div>
    </div>
  );
};

interface PrayerRowProps {
  name: string;
  adhan: string;
  iqamah: string;
  isNext: boolean;
  formatTime: (time: string) => string;
}

const PrayerRow = ({ name, adhan, iqamah, isNext, formatTime }: PrayerRowProps) => (
  <tr className={cn(
    "border-b border-border/50 last:border-0",
    isNext ? "bg-primary/5" : ""
  )}>
    <td className="py-3 px-4 font-medium">{name}</td>
    <td className="py-3 px-4 text-muted-foreground">{formatTime(adhan)}</td>
    <td className="py-3 px-4">
      <span className={cn(
        "inline-block",
        isNext ? "font-medium text-mosque" : ""
      )}>
        {formatTime(iqamah)}
      </span>
      {isNext && (
        <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
          Next
        </span>
      )}
    </td>
  </tr>
);

interface JummahRowProps {
  jummahTimes: { khutbah: string; prayer: string }[];
  formatTime: (time: string) => string;
}

const JummahRow = ({ jummahTimes, formatTime }: JummahRowProps) => (
  <tr className="border-b border-border/50">
    <td className="py-3 px-4 font-medium">Jummah</td>
    <td className="py-3 px-4 text-muted-foreground" colSpan={2}>
      {jummahTimes.length > 0 ? (
        <div className="space-y-1">
          {jummahTimes.map((jummah, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs bg-secondary rounded-full px-1.5 py-0.5">
                {index + 1}
              </span>
              <span>
                Khutbah: {formatTime(jummah.khutbah)}, Prayer: {formatTime(jummah.prayer)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-muted-foreground">Not available</span>
      )}
    </td>
  </tr>
);
