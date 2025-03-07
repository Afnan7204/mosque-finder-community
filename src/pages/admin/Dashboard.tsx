
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerTimesManager } from "@/components/admin/PrayerTimesManager";
import { AnnouncementsManager } from "@/components/admin/AnnouncementsManager";
import { getMosqueById } from "@/services/mosqueService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mosque, setMosque] = useState<any>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (profile?.mosque_id) {
          const mosqueData = await getMosqueById(profile.mosque_id);
          setMosque(mosqueData);
        }
      } catch (error) {
        console.error("Error loading mosque data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load mosque data",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (profile) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [profile]);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load your dashboard.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!profile?.mosque_id) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-card rounded-lg shadow-elegant">
            <h2 className="text-2xl font-semibold mb-4">No Mosque Associated</h2>
            <p className="text-muted-foreground mb-6">
              Your account is not associated with any mosque. Please contact an administrator
              or register a new mosque.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={() => navigate("/admin/register-mosque")}>Register a Mosque</Button>
              <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <section className="flex-grow pt-32 pb-16">
        <Container>
          <div className="bg-card shadow-elegant rounded-xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {profile?.name || user?.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
              </div>
            </div>
            
            {mosque && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{mosque.name}</h2>
                <p className="text-muted-foreground">
                  {mosque.address}, {mosque.city}, {mosque.state}, {mosque.country}
                </p>
              </div>
            )}
            
            <Tabs defaultValue="prayer-times" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="prayer-times">Prayer Times</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prayer-times" className="mt-0">
                {profile?.mosque_id && (
                  <PrayerTimesManager mosqueId={profile.mosque_id} />
                )}
              </TabsContent>
              
              <TabsContent value="announcements" className="mt-0">
                {profile?.mosque_id && (
                  <AnnouncementsManager mosqueId={profile.mosque_id} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
