
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Announcement } from "@/lib/types";
import { getAnnouncementsByMosque, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/services/announcementsService";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";

interface AnnouncementsManagerProps {
  mosqueId: string;
}

export function AnnouncementsManager({ mosqueId }: AnnouncementsManagerProps) {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general",
    eventDate: "",
    eventTime: "",
    expiryDate: "",
  });
  
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await getAnnouncementsByMosque(mosqueId);
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load announcements",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (mosqueId) {
      fetchAnnouncements();
    }
  }, [mosqueId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "general",
      eventDate: "",
      eventTime: "",
      expiryDate: "",
    });
    setIsEditing(false);
    setSelectedAnnouncement(null);
  };
  
  const handleOpenDialog = (announcement?: Announcement) => {
    if (announcement) {
      setIsEditing(true);
      setSelectedAnnouncement(announcement);
      setFormData({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        eventDate: announcement.eventDate || "",
        eventTime: announcement.eventTime || "",
        expiryDate: announcement.expiryDate ? announcement.expiryDate.split("T")[0] : "",
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (!formData.title.trim() || !formData.content.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Title and content are required",
        });
        return;
      }
      
      if (formData.type === "event" && (!formData.eventDate || !formData.eventTime)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Event date and time are required for event announcements",
        });
        return;
      }
      
      if (isEditing && selectedAnnouncement) {
        await updateAnnouncement({
          id: selectedAnnouncement.id,
          mosqueId,
          title: formData.title,
          content: formData.content,
          datePosted: selectedAnnouncement.datePosted,
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : undefined,
          type: formData.type as "general" | "event" | "eid" | "ramadan",
          eventDate: formData.eventDate || undefined,
          eventTime: formData.eventTime || undefined,
        });
        
        toast({
          title: "Success",
          description: "Announcement updated successfully",
        });
      } else {
        await createAnnouncement({
          mosqueId,
          title: formData.title,
          content: formData.content,
          datePosted: new Date().toISOString(),
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : undefined,
          type: formData.type as "general" | "event" | "eid" | "ramadan",
          eventDate: formData.eventDate || undefined,
          eventTime: formData.eventTime || undefined,
        });
        
        toast({
          title: "Success",
          description: "Announcement created successfully",
        });
      }
      
      handleCloseDialog();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save announcement",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteAnnouncement(id);
      
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
      
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete announcement",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "event": return "Event";
      case "eid": return "Eid";
      case "ramadan": return "Ramadan";
      default: return "General";
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Announcements</CardTitle>
        <Button onClick={() => handleOpenDialog()}>New Announcement</Button>
      </CardHeader>
      <CardContent>
        {loading && announcements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No announcements yet. Click "New Announcement" to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                    <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                      <div>Posted: {format(new Date(announcement.datePosted), "MMM d, yyyy")}</div>
                      <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                        {getTypeLabel(announcement.type)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(announcement)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the announcement.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(announcement.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="mt-2">{announcement.content}</p>
                
                {announcement.type === "event" && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Event Date: </span>
                    {announcement.eventDate && format(new Date(announcement.eventDate), "MMMM d, yyyy")}
                    {announcement.eventTime && ` at ${announcement.eventTime}`}
                  </div>
                )}
                
                {announcement.expiryDate && (
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Expires: </span>
                    {format(new Date(announcement.expiryDate), "MMMM d, yyyy")}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Announcement" : "New Announcement"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Make changes to the announcement here." 
                  : "Create a new announcement for your mosque."}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Announcement title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Announcement content"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="eid">Eid</SelectItem>
                    <SelectItem value="ramadan">Ramadan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.type === "event" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Event Time</Label>
                    <Input
                      id="eventTime"
                      name="eventTime"
                      type="time"
                      value={formData.eventTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">
                  If set, the announcement will no longer be visible after this date.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
