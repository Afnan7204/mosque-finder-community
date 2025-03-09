
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { extractCoordinates } from "@/utils/googleMaps";
import { BasicInfoForm } from "@/components/admin/register/BasicInfoForm";
import { MosqueDetailsForm } from "@/components/admin/register/MosqueDetailsForm";
import { AccountForm } from "@/components/admin/register/AccountForm";
import { RegistrationSteps } from "@/components/admin/register/RegistrationSteps";

const RegisterMosque = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSchoolOptions, setShowSchoolOptions] = useState(false);
  const { signUp, user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);
  
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
    imageUrl: "",
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

  const setImageUrl = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    if (formData.adminPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const coordinates = formData.googleMapsLink 
        ? extractCoordinates(formData.googleMapsLink)
        : null;
      
      const { data: authData, error: authError } = await signUp(
        formData.adminEmail,
        formData.adminPassword,
        {
          name: formData.adminName,
        }
      );
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      const { data: mosqueData, error: mosqueError } = await supabase
        .from('mosques')
        .insert([{
          name: formData.mosqueName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          coordinates: coordinates,
          school: formData.school,
          facilities: formData.facilities,
          contactnumber: formData.contactNumber || null,
          email: formData.email || null,
          website: formData.website || null,
          image: formData.imageUrl || null,
        }])
        .select('id')
        .single();
      
      if (mosqueError) {
        throw new Error(mosqueError.message);
      }
      
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ mosque_id: mosqueData.id })
          .eq('id', authData.user.id);
          
        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
        
        // If there's an image and it's a temporary one, move it to the proper location
        if (formData.imageUrl && formData.imageUrl.includes('temp-')) {
          const oldPath = formData.imageUrl.split('mosque_images/')[1];
          const fileExt = oldPath.split('.').pop();
          const newPath = `${mosqueData.id}/mosque-image.${fileExt}`;
          
          // Download the existing file
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('mosque_images')
            .download(oldPath);
            
          if (downloadError) {
            console.error("Error downloading temporary image:", downloadError);
          } else if (fileData) {
            // Upload to the new location
            const { error: uploadError, data } = await supabase.storage
              .from('mosque_images')
              .upload(newPath, fileData, {
                upsert: true,
                contentType: fileData.type,
              });
              
            if (uploadError) {
              console.error("Error moving image to permanent location:", uploadError);
            } else {
              // Get the public URL
              const { data: publicUrlData } = supabase.storage
                .from('mosque_images')
                .getPublicUrl(newPath);
                
              // Update the mosque with the new image URL
              const { error: updateError } = await supabase
                .from('mosques')
                .update({ image: publicUrlData.publicUrl })
                .eq('id', mosqueData.id);
                
              if (updateError) {
                console.error("Error updating mosque with new image URL:", updateError);
              }
              
              // Remove the temporary file
              const { error: removeError } = await supabase.storage
                .from('mosque_images')
                .remove([oldPath]);
                
              if (removeError) {
                console.error("Error removing temporary image:", removeError);
              }
            }
          }
        }
      }
      
      toast({
        title: "Registration successful",
        description: "Your mosque registration is pending approval",
      });
      
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
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

            <RegistrationSteps currentStep={currentStep} />
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <BasicInfoForm 
                  formData={formData} 
                  handleChange={handleChange} 
                />
              )}
              
              {currentStep === 2 && (
                <MosqueDetailsForm 
                  formData={formData}
                  handleChange={handleChange}
                  handleFacilityToggle={handleFacilityToggle}
                  handleSchoolSelect={handleSchoolSelect}
                  showSchoolOptions={showSchoolOptions}
                  setShowSchoolOptions={setShowSchoolOptions}
                  availableFacilities={availableFacilities}
                  setImageUrl={setImageUrl}
                />
              )}
              
              {currentStep === 3 && (
                <AccountForm 
                  formData={formData} 
                  handleChange={handleChange} 
                />
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
