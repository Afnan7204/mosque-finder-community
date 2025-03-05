
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Clock, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* How It Works Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-blue-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold mb-6 tracking-tight">
              How <span className="text-mosque">Good Muslim</span> Works
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our platform helps you find nearby mosques and access accurate prayer timings through community-driven data.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-8 w-8 text-mosque" />}
              title="Find Nearby Mosques"
              description="Use your location to discover mosques around you with detailed information about facilities."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-mosque" />}
              title="Prayer Timings"
              description="Get accurate prayer times with both Adhan and Iqamah schedules for each mosque."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-mosque" />}
              title="Community Updates"
              description="Stay informed with announcements about special events, Eid prayers, and community gatherings."
            />
          </div>
          
          <div className="mt-16 space-y-12">
            <StepCard
              number={1}
              title="Search for Mosques"
              description="Enter your location or use the automatic location finder to discover mosques near you. You can also search by name or browse all mosques in the directory."
            />
            
            <StepCard
              number={2}
              title="View Mosque Details"
              description="Click on a mosque to view detailed information, including prayer times, facilities, contact details, and community announcements."
            />
            
            <StepCard
              number={3}
              title="Set Prayer Notifications"
              description="Enable notifications for prayer times at your preferred mosques to ensure you never miss a prayer."
            />
            
            <StepCard
              number={4}
              title="Contribute to the Community"
              description="Mosque administrators can register their mosque and keep information up to date, ensuring the community has accurate and timely information."
            />
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="mb-4 bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="flex flex-col md:flex-row items-start gap-6">
    <div className="bg-mosque text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default HowItWorks;
