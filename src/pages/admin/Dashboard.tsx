import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { 
  Bell, ChevronDown, Clock, Edit, Home, LayoutDashboard, LogOut, 
  Menu, MessageSquare, Plus, Settings, Users, X
} from "lucide-react";
import { mockMosques, mockPrayerTimes, mockAnnouncements } from "@/lib/mosqueData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use first mosque as the current mosque for this demo
  const currentMosque = mockMosques[0];
  const prayerTimes = mockPrayerTimes.find(pt => pt.mosqueId === currentMosque.id);
  const announcements = mockAnnouncements.filter(a => a.mosqueId === currentMosque.id);
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex-shrink-0 w-64 bg-card shadow-elegant transition-transform duration-300 ease-in-out lg:static lg:translate-x-0", 
          isSidebarOpen ? "lg:w-64" : "lg:w-20",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn(
            "flex items-center px-4 h-16 border-b border-border",
            isSidebarOpen ? "justify-between" : "justify-center"
          )}>
            {isSidebarOpen && (
              <Link to="/" className="flex items-center gap-2 text-mosque font-medium">
                <LayoutDashboard className="h-6 w-6" />
                <span>Mosque Admin</span>
              </Link>
            )}
            
            {!isSidebarOpen && (
              <LayoutDashboard className="h-6 w-6 text-mosque" />
            )}
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-muted-foreground hover:text-foreground hidden lg:block"
            >
              {isSidebarOpen ? <ChevronDown className="h-5 w-5 rotate-90" /> : <ChevronDown className="h-5 w-5 -rotate-90" />}
            </button>
            
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              <SidebarLink 
                to="/admin/dashboard" 
                icon={<Home />} 
                label="Overview" 
                active={activeTab === "overview"} 
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("overview")}
              />
              <SidebarLink 
                to="/admin/dashboard?tab=prayers" 
                icon={<Clock />} 
                label="Prayer Times" 
                active={activeTab === "prayers"}
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("prayers")}
              />
              <SidebarLink 
                to="/admin/dashboard?tab=announcements" 
                icon={<Bell />} 
                label="Announcements" 
                active={activeTab === "announcements"}
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("announcements")}
              />
              <SidebarLink 
                to="/admin/dashboard?tab=community" 
                icon={<Users />} 
                label="Community" 
                active={activeTab === "community"}
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("community")}
              />
              <SidebarLink 
                to="/admin/dashboard?tab=messages" 
                icon={<MessageSquare />} 
                label="Messages" 
                active={activeTab === "messages"}
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("messages")}
                badge={3}
              />
              <SidebarLink 
                to="/admin/dashboard?tab=settings" 
                icon={<Settings />} 
                label="Settings" 
                active={activeTab === "settings"}
                collapsed={!isSidebarOpen}
                onClick={() => setActiveTab("settings")}
              />
            </nav>
          </div>
          
          <div className="p-4 border-t border-border">
            <button 
              onClick={handleLogout}
              className={cn(
                "flex items-center text-red-500 hover:bg-red-50 rounded-md w-full",
                isSidebarOpen ? "px-3 py-2 justify-start" : "p-2 justify-center"
              )}
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-2">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main className={cn(
        "flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        {/* Top header */}
        <header className="bg-card shadow-sm border-b border-border h-16 flex items-center z-10">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="text-muted-foreground hover:text-foreground mr-4 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <h1 className="text-xl font-semibold">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "prayers" && "Prayer Times Management"}
                {activeTab === "announcements" && "Announcements"}
                {activeTab === "community" && "Community Management"}
                {activeTab === "messages" && "Messages"}
                {activeTab === "settings" && "Mosque Settings"}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden sm:block">
                {currentMosque.name}
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link to="/admin/register-mosque">
                  Switch Mosque
                </Link>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard overview content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Today's Prayers" value="5" subtitle="All on schedule" />
                <DashboardCard title="Active Announcements" value={announcements.length.toString()} subtitle="2 expiring soon" />
                <DashboardCard title="Community Members" value="254" subtitle="12 new this month" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prayer Times Card */}
                <div className="bg-card shadow-elegant rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Today's Prayer Times</h2>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/dashboard?tab=prayers">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                  
                  {prayerTimes && (
                    <div className="space-y-3">
                      <PrayerTimeRow name="Fajr" adhan={prayerTimes.fajr.adhan} iqamah={prayerTimes.fajr.iqamah} />
                      <PrayerTimeRow name="Dhuhr" adhan={prayerTimes.dhuhr.adhan} iqamah={prayerTimes.dhuhr.iqamah} />
                      <PrayerTimeRow name="Asr" adhan={prayerTimes.asr.adhan} iqamah={prayerTimes.asr.iqamah} />
                      <PrayerTimeRow name="Maghrib" adhan={prayerTimes.maghrib.adhan} iqamah={prayerTimes.maghrib.iqamah} />
                      <PrayerTimeRow name="Isha" adhan={prayerTimes.isha.adhan} iqamah={prayerTimes.isha.iqamah} />
                    </div>
                  )}
                </div>
                
                {/* Recent Announcements */}
                <div className="bg-card shadow-elegant rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Announcements</h2>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/dashboard?tab=announcements">
                        <Plus className="h-4 w-4 mr-1" />
                        New
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {announcements.slice(0, 3).map(announcement => (
                      <div key={announcement.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getAnnouncementTypeClass(announcement.type)}`}>
                            {announcement.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {announcement.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mosque Info */}
              <div className="bg-card shadow-elegant rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Mosque Information</h2>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/dashboard?tab=settings">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm">Name</dt>
                        <dd className="text-sm font-medium">{currentMosque.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Address</dt>
                        <dd className="text-sm font-medium">{currentMosque.address}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">City</dt>
                        <dd className="text-sm font-medium">{currentMosque.city}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Fiqh School</dt>
                        <dd className="text-sm font-medium">{currentMosque.school}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm">Phone</dt>
                        <dd className="text-sm font-medium">{currentMosque.contactNumber || "Not provided"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Email</dt>
                        <dd className="text-sm font-medium">{currentMosque.email || "Not provided"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Website</dt>
                        <dd className="text-sm font-medium">{currentMosque.website || "Not provided"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMosque.facilities.map(facility => (
                      <span 
                        key={facility} 
                        className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs would be implemented here */}
          {activeTab !== "overview" && (
            <div className="p-8 text-center text-muted-foreground">
              <h2 className="text-xl font-medium mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h2>
              <p>This section is under development. Coming soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  badge?: number;
}

const SidebarLink = ({ to, icon, label, active, collapsed, onClick, badge }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-primary/10 text-mosque"
          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
        collapsed ? "justify-center" : "justify-start"
      )}
      onClick={onClick}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
      
      {badge && !collapsed && (
        <span className="ml-auto bg-mosque text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
      
      {badge && collapsed && (
        <span className="absolute top-0 right-0 bg-mosque text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1">
          {badge}
        </span>
      )}
    </Link>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
}

const DashboardCard = ({ title, value, subtitle }: DashboardCardProps) => (
  <div className="bg-card p-6 rounded-lg shadow-elegant">
    <h3 className="text-muted-foreground font-medium text-sm">{title}</h3>
    <p className="text-3xl font-semibold mt-2">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </div>
);

interface PrayerTimeRowProps {
  name: string;
  adhan: string;
  iqamah: string;
}

const PrayerTimeRow = ({ name, adhan, iqamah }: PrayerTimeRowProps) => (
  <div className="flex justify-between border-b border-border/50 pb-2 last:border-0">
    <span className="font-medium">{name}</span>
    <div className="flex gap-4">
      <div>
        <span className="text-xs text-muted-foreground block">Adhan</span>
        <span className="text-sm">{adhan}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Iqamah</span>
        <span className="text-sm">{iqamah}</span>
      </div>
    </div>
  </div>
);

const getAnnouncementTypeClass = (type: string) => {
  switch (type) {
    case "event":
      return "bg-blue-100 text-blue-800";
    case "eid":
      return "bg-green-100 text-green-800";
    case "ramadan":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default AdminDashboard;
