
import React from "react";
import { LinkIcon, MapPin } from "lucide-react";

interface BasicInfoFormProps {
  formData: {
    mosqueName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    googleMapsLink: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const BasicInfoForm = ({ formData, handleChange }: BasicInfoFormProps) => {
  return (
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
  );
};
