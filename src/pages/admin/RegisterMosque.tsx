
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, Building, ChevronDown, Info, MapPin, Phone, X, Link as LinkIcon } from "lucide-react";

const RegisterMosque = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSchoolOptions, setShowSchoolOptions] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    mosqueName: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    googleMapsLink: "",
    school: "Shafi'i",
    facilities: [] as string[],
    contactNumber: "",
    email: "",
    website: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
  });

  const availableFacilities = [
    "Parking", "Wudu Area", "Women's Section", "Library",
    "Islamic Center", "Quran Classes", "Community Hall", "Wheelchair Access"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => {
      const facilities = [...prev.facilities];
      if (facilities.includes(facility)) {
        return { ...prev, facilities: facilities.filter(f => f !== facility) };
      } else {
        return { ...prev, facilities: [...facilities, facility] };
      }
    });
  };

  const handleSchoolSelect = (school: string) => {
    setFormData((prev) => ({ ...prev, school }));
    setShowSchoolOptions(false);
  };

  // Extract coordinates from Google Maps link
  const extractCoordinates = (googleMapsLink: string) => {
    try {
      // Common pattern for Google Maps links with coordinates
      const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
      const match = googleMapsLink.match(regex);
      
      if (match && match.length >= 3) {
        return {
          latitude: match[1],
          longitude: match[2]
        };
      }
      
      return null;
    } catch (error) {
      console.error("Error extracting coordinates:", error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    // Final submission
    if (formData.adminPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Extract coordinates from Google Maps link if provided
    const coordinates = formData.googleMapsLink 
      ? extractCoordinates(formData.googleMapsLink)
      : null;
    
    // Prepare data for submission
    const mosqueData = {
      ...formData,
      coordinates: coordinates || { latitude: "", longitude: "" }
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log("Mosque data to be saved:", mosqueData);
      toast({
        title: "Registration successful",
        description: "Your mosque registration is pending approval",
      });
      navigate("/admin/login");
      setIsLoading(false);
    }, 2000);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="flex-grow pt-32 pb-16 bg-gradient-to-b from-white to-blue-50">
        <Container size="md">
          <div className="bg-card shadow-elegant rounded-xl p-8">
            <h1 className="text-2xl font-semibold text-center mb-2">Register Your Mosque</h1>
            <p className="text-center text-muted-foreground mb-6">
              Join our platform to keep your community updated with accurate prayer times
            </p>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Mosque Info</span>
              </div>
              <div className={`h-1 flex-grow mx-2 ${currentStep >= 2 ? 'bg-mosque' : 'bg-muted'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Details</span>
              </div>
              <div className={`h-1 flex-grow mx-2 ${currentStep >= 3 ? 'bg-mosque' : 'bg-muted'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
                <span className="text-xs mt-1">Account</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Mosque Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mosqueName" className="block text-sm font-medium mb-1">
                      Mosque Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mosqueName"
                      name="mosqueName"
                      type="text"
                      value={formData.mosqueName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Enter mosque name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Enter country"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="googleMapsLink" className="block text-sm font-medium mb-1">
                      Google Maps Link
                    </label>
                    <div className="relative">
                      <input
                        id="googleMapsLink"
                        name="googleMapsLink"
                        type="url"
                        value={formData.googleMapsLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="e.g. https://maps.google.com/..."
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                        <LinkIcon size={16} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Paste the Google Maps link for your mosque location. We'll extract the coordinates automatically.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 2: Detailed Mosque Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fiqh School
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full px-4 py-2 border border-border rounded-md flex justify-between items-center"
                        onClick={() => setShowSchoolOptions(!showSchoolOptions)}
                      >
                        <span>{formData.school}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {showSchoolOptions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-md z-10">
                          <ul>
                            {["Shafi'i", "Hanafi", "Maliki", "Hanbali", "Other"].map(school => (
                              <li key={school}>
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-2 hover:bg-primary/5"
                                  onClick={() => handleSchoolSelect(school)}
                                >
                                  {school}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Facilities
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableFacilities.map(facility => (
                        <div 
                          key={facility}
                          className={`rounded-md border px-3 py-2 cursor-pointer flex items-center gap-2 ${
                            formData.facilities.includes(facility) 
                              ? 'border-mosque bg-primary/10' 
                              : 'border-border hover:bg-primary/5'
                          }`}
                          onClick={() => handleFacilityToggle(facility)}
                        >
                          {formData.facilities.includes(facility) && (
                            <BadgeCheck className="h-4 w-4 text-mosque" />
                          )}
                          <span className={formData.facilities.includes(facility) ? 'text-mosque' : ''}>
                            {facility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium mb-1">
                      Contact Number
                    </label>
                    <div className="relative">
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="Enter contact number"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                        <Phone size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Mosque Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="Enter mosque email"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-1">
                        Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex gap-3">
                    <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      You'll be able to add prayer times and other details after your mosque is registered.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 3: Admin Account Creation */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="adminName" className="block text-sm font-medium mb-1">
                      Admin Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="adminName"
                      name="adminName"
                      type="text"
                      value={formData.adminName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium mb-1">
                      Admin Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="adminEmail"
                      name="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">This will be used for login and communications</p>
                  </div>
                  
                  <div>
                    <label htmlFor="adminPassword" className="block text-sm font-medium mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="adminPassword"
                      name="adminPassword"
                      type="password"
                      value={formData.adminPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-mosque focus:ring-mosque border-border rounded mt-1"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm">
                      I agree to the <a href="#" className="text-mosque hover:underline">Terms of Service</a> and <a href="#" className="text-mosque hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={goBack}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button type="submit" disabled={isLoading}>
                  {currentStep < 3 ? "Continue" : isLoading ? "Submitting..." : "Register Mosque"}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default RegisterMosque;
