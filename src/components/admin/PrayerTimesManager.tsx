
import { useState, useEffect } from "react";
import { format, addDays, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PrayerTimes } from "@/lib/types";
import { getPrayerTimesByMosque, createPrayerTime, updatePrayerTime } from "@/services/prayerTimesService";

interface PrayerTimesManagerProps {
  mosqueId: string;
}

export function PrayerTimesManager({ mosqueId }: PrayerTimesManagerProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    fajrAdhan: "",
    fajrIqamah: "",
    dhuhrAdhan: "",
    dhuhrIqamah: "",
    asrAdhan: "",
    asrIqamah: "",
    maghribAdhan: "",
    maghribIqamah: "",
    ishaAdhan: "",
    ishaIqamah: "",
    jummahKhutbah: "",
    jummahPrayer: "",
  });
  
  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      const dateStr = format(date, "yyyy-MM-dd");
      const data = await getPrayerTimesByMosque(mosqueId, dateStr);
      
      if (data.length > 0) {
        setPrayerTimes(data[0]);
        setFormData({
          fajrAdhan: data[0].fajr.adhan,
          fajrIqamah: data[0].fajr.iqamah,
          dhuhrAdhan: data[0].dhuhr.adhan,
          dhuhrIqamah: data[0].dhuhr.iqamah,
          asrAdhan: data[0].asr.adhan,
          asrIqamah: data[0].asr.iqamah,
          maghribAdhan: data[0].maghrib.adhan,
          maghribIqamah: data[0].maghrib.iqamah,
          ishaAdhan: data[0].isha.adhan,
          ishaIqamah: data[0].isha.iqamah,
          jummahKhutbah: data[0]?.jummah?.[0]?.khutbah || "",
          jummahPrayer: data[0]?.jummah?.[0]?.prayer || "",
        });
      } else {
        setPrayerTimes(null);
        setFormData({
          fajrAdhan: "",
          fajrIqamah: "",
          dhuhrAdhan: "",
          dhuhrIqamah: "",
          asrAdhan: "",
          asrIqamah: "",
          maghribAdhan: "",
          maghribIqamah: "",
          ishaAdhan: "",
          ishaIqamah: "",
          jummahKhutbah: "",
          jummahPrayer: "",
        });
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load prayer times",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (mosqueId) {
      fetchPrayerTimes();
    }
  }, [mosqueId, date]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);
      const dateStr = format(date, "yyyy-MM-dd");
      const jummahArray = [];
      
      if (formData.jummahKhutbah && formData.jummahPrayer) {
        jummahArray.push({
          khutbah: formData.jummahKhutbah,
          prayer: formData.jummahPrayer,
        });
      }
      
      const newPrayerTimes: PrayerTimes = {
        mosqueId,
        date: dateStr,
        fajr: {
          adhan: formData.fajrAdhan,
          iqamah: formData.fajrIqamah,
        },
        dhuhr: {
          adhan: formData.dhuhrAdhan,
          iqamah: formData.dhuhrIqamah,
        },
        asr: {
          adhan: formData.asrAdhan,
          iqamah: formData.asrIqamah,
        },
        maghrib: {
          adhan: formData.maghribAdhan,
          iqamah: formData.maghribIqamah,
        },
        isha: {
          adhan: formData.ishaAdhan,
          iqamah: formData.ishaIqamah,
        },
        jummah: jummahArray.length > 0 ? jummahArray : undefined,
      };
      
      if (prayerTimes) {
        await updatePrayerTime(newPrayerTimes);
      } else {
        await createPrayerTime(newPrayerTimes);
      }
      
      toast({
        title: "Success",
        description: "Prayer times saved successfully",
      });
      
      setIsEditing(false);
      fetchPrayerTimes();
    } catch (error) {
      console.error("Error saving prayer times:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save prayer times",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyFromPrevious = async () => {
    try {
      const previousDay = addDays(date, -1);
      const previousDayStr = format(previousDay, "yyyy-MM-dd");
      const previousData = await getPrayerTimesByMosque(mosqueId, previousDayStr);
      
      if (previousData.length > 0) {
        const prev = previousData[0];
        setFormData({
          fajrAdhan: prev.fajr.adhan,
          fajrIqamah: prev.fajr.iqamah,
          dhuhrAdhan: prev.dhuhr.adhan,
          dhuhrIqamah: prev.dhuhr.iqamah,
          asrAdhan: prev.asr.adhan,
          asrIqamah: prev.asr.iqamah,
          maghribAdhan: prev.maghrib.adhan,
          maghribIqamah: prev.maghrib.iqamah,
          ishaAdhan: prev.isha.adhan,
          ishaIqamah: prev.isha.iqamah,
          jummahKhutbah: prev?.jummah?.[0]?.khutbah || "",
          jummahPrayer: prev?.jummah?.[0]?.prayer || "",
        });
        
        toast({
          title: "Success",
          description: "Prayer times copied from previous day",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No prayer times found for previous day",
        });
      }
    } catch (error) {
      console.error("Error copying from previous day:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy prayer times",
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Prayer Times Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-background">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="mx-auto"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Selected Date: {format(date, "EEEE, MMMM d, yyyy")}</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsEditing(true)} 
                  disabled={isEditing || loading}
                >
                  {prayerTimes ? "Edit Times" : "Add Times"}
                </Button>
                {!prayerTimes && (
                  <Button
                    variant="outline"
                    onClick={handleCopyFromPrevious}
                    disabled={isEditing || loading}
                  >
                    Copy from Previous Day
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="daily">Daily Prayers</TabsTrigger>
                <TabsTrigger value="jummah">Jummah</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="space-y-4 p-4 border rounded-lg mt-2">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Prayer</div>
                      <div className="font-medium">Adhan</div>
                      <div className="font-medium">Iqamah</div>
                      
                      <div>Fajr</div>
                      <div>
                        <Input
                          name="fajrAdhan"
                          value={formData.fajrAdhan}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      <div>
                        <Input
                          name="fajrIqamah"
                          value={formData.fajrIqamah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      
                      <div>Dhuhr</div>
                      <div>
                        <Input
                          name="dhuhrAdhan"
                          value={formData.dhuhrAdhan}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      <div>
                        <Input
                          name="dhuhrIqamah"
                          value={formData.dhuhrIqamah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      
                      <div>Asr</div>
                      <div>
                        <Input
                          name="asrAdhan"
                          value={formData.asrAdhan}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      <div>
                        <Input
                          name="asrIqamah"
                          value={formData.asrIqamah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      
                      <div>Maghrib</div>
                      <div>
                        <Input
                          name="maghribAdhan"
                          value={formData.maghribAdhan}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      <div>
                        <Input
                          name="maghribIqamah"
                          value={formData.maghribIqamah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      
                      <div>Isha</div>
                      <div>
                        <Input
                          name="ishaAdhan"
                          value={formData.ishaAdhan}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                      <div>
                        <Input
                          name="ishaIqamah"
                          value={formData.ishaIqamah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  prayerTimes ? (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Prayer</div>
                      <div className="font-medium">Adhan</div>
                      <div className="font-medium">Iqamah</div>
                      
                      <div>Fajr</div>
                      <div>{prayerTimes.fajr.adhan}</div>
                      <div>{prayerTimes.fajr.iqamah}</div>
                      
                      <div>Dhuhr</div>
                      <div>{prayerTimes.dhuhr.adhan}</div>
                      <div>{prayerTimes.dhuhr.iqamah}</div>
                      
                      <div>Asr</div>
                      <div>{prayerTimes.asr.adhan}</div>
                      <div>{prayerTimes.asr.iqamah}</div>
                      
                      <div>Maghrib</div>
                      <div>{prayerTimes.maghrib.adhan}</div>
                      <div>{prayerTimes.maghrib.iqamah}</div>
                      
                      <div>Isha</div>
                      <div>{prayerTimes.isha.adhan}</div>
                      <div>{prayerTimes.isha.iqamah}</div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No prayer times set for this date. Click "Add Times" to add them.
                    </div>
                  )
                )}
              </TabsContent>
              
              <TabsContent value="jummah" className="space-y-4 p-4 border rounded-lg mt-2">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="jummahKhutbah">Khutbah Time</Label>
                        <Input
                          id="jummahKhutbah"
                          name="jummahKhutbah"
                          value={formData.jummahKhutbah}
                          onChange={handleChange}
                          placeholder="HH:MM"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jummahPrayer">Prayer Time</Label>
                        <Input
                          id="jummahPrayer"
                          name="jummahPrayer"
                          value={formData.jummahPrayer}
                          onChange={handleChange}
                          placeholder="HH:MM"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  prayerTimes && prayerTimes.jummah && prayerTimes.jummah.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Khutbah Time: </span>
                        {prayerTimes.jummah[0].khutbah}
                      </div>
                      <div>
                        <span className="font-medium">Prayer Time: </span>
                        {prayerTimes.jummah[0].prayer}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No Jummah times set for this date.
                    </div>
                  )
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
