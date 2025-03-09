
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Phone, Mail, Globe, Users, Calendar } from "lucide-react";
import { getMosqueById, getMosquePrayerTimes, getMosqueAnnouncements } from "@/lib/mosqueData";
import { Mosque, PrayerTimes, Announcement } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/common/Badge";
import { MapView } from "@/components/map/MapView";
import { cn } from "@/lib/utils";

const MosqueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mosque, setMosque] = useState<Mosque | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState<"prayers" | "announcements" | "info">("prayers");

  useEffect(() => {
    if (id) {
      const mosqueData = getMosqueById(id);
      if (mosqueData) {
        setMosque(mosqueData);
        setPrayerTimes(getMosquePrayerTimes(id));
        setAnnouncements(getMosqueAnnouncements(id));
      }
    }
  }, [id]);

  if (!mosque) {
    return (
      <Container className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-semibold mb-4">Mosque not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Container>
    );
  }

  // Format time to 12-hour format
  const formatTime = (time24: string) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <Container className="py-6 md:py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 hover:pl-1 transition-all duration-200" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to mosques
      </Button>
      
      {/* Mosque header */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full rounded-lg overflow-hidden mb-6">
        <img
          src={mosque.image || "/placeholder.svg"}
          alt={mosque.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{mosque.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{mosque.address}, {mosque.city}, {mosque.state}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs - Reordered to Prayers -> Announcements -> Info */}
      <div className="border-b border-border mb-6">
        <div className="flex space-x-6 -mb-px">
          {["prayers", "announcements", "info"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab content */}
      <div className="space-y-8">
        {/* Prayers tab */}
        {activeTab === "prayers" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Prayer Times for Today
            </h2>
            
            {prayerTimes ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Prayer</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Adhan</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Iqamah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Fajr</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.fajr.adhan)}</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.fajr.iqamah)}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Dhuhr</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.dhuhr.adhan)}</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.dhuhr.iqamah)}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Asr</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.asr.adhan)}</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.asr.iqamah)}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Maghrib</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.maghrib.adhan)}</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.maghrib.iqamah)}</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Isha</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.isha.adhan)}</td>
                      <td className="py-3 px-4">{formatTime(prayerTimes.isha.iqamah)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Prayer times not available</p>
              </div>
            )}
            
            {/* Jummah section */}
            {prayerTimes && prayerTimes.jummah && prayerTimes.jummah.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Jummah Prayer
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Session</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Khutbah</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground border-b">Prayer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prayerTimes.jummah.map((jummah, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4 font-medium">{index + 1}</td>
                          <td className="py-3 px-4">{formatTime(jummah.khutbah)}</td>
                          <td className="py-3 px-4">{formatTime(jummah.prayer)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Announcements tab */}
        {activeTab === "announcements" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Announcements & Events
            </h2>
            
            {announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.map((announcement) => {
                  // Parse dates
                  const datePosted = new Date(announcement.datePosted);
                  const formattedDate = datePosted.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                  
                  return (
                    <div key={announcement.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <Badge 
                          variant={
                            announcement.type === "eid" ? "success" :
                            announcement.type === "ramadan" ? "warning" :
                            announcement.type === "event" ? "primary" : "default"
                          }
                          size="sm"
                        >
                          {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 whitespace-pre-line">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Posted: {formattedDate}</span>
                        {announcement.eventDate && (
                          <div className="flex items-center text-primary">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(announcement.eventDate).toLocaleDateString()}</span>
                            {announcement.eventTime && (
                              <span className="ml-1">at {formatTime(announcement.eventTime)}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No announcements available</p>
              </div>
            )}
          </div>
        )}
        
        {/* Info tab */}
        {activeTab === "info" && (
          <div className="space-y-6 animate-fade-in">
            {/* Details section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        {mosque.address}, {mosque.city}, {mosque.state}, {mosque.country}
                      </p>
                    </div>
                  </div>
                  
                  {mosque.contactNumber && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">{mosque.contactNumber}</p>
                      </div>
                    </div>
                  )}
                  
                  {mosque.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">{mosque.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {mosque.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Website</h3>
                        <a 
                          href={mosque.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {mosque.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {mosque.facilities.map((facility) => (
                    <Badge key={facility} variant="outline" className="px-3 py-1">
                      {facility}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">School of Thought</h3>
                  <Badge variant="primary">{mosque.school}</Badge>
                </div>
              </div>
            </div>
            
            {/* Map section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-[300px] rounded-lg overflow-hidden border border-border">
                <MapView mosques={[mosque]} selectedMosqueId={mosque.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MosqueDetails;
