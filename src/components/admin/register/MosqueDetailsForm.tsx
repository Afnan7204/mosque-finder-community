
import React from "react";
import { BadgeCheck, ChevronDown, Info, Phone } from "lucide-react";

interface MosqueDetailsFormProps {
  formData: {
    school: string;
    facilities: string[];
    contactNumber: string;
    email: string;
    website: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFacilityToggle: (facility: string) => void;
  handleSchoolSelect: (school: string) => void;
  showSchoolOptions: boolean;
  setShowSchoolOptions: React.Dispatch<React.SetStateAction<boolean>>;
  availableFacilities: string[];
}

export const MosqueDetailsForm = ({ 
  formData, 
  handleChange, 
  handleFacilityToggle, 
  handleSchoolSelect,
  showSchoolOptions,
  setShowSchoolOptions,
  availableFacilities
}: MosqueDetailsFormProps) => {
  return (
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
  );
};
