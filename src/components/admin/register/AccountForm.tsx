
import React from "react";

interface AccountFormProps {
  formData: {
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const AccountForm = ({ formData, handleChange }: AccountFormProps) => {
  return (
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
  );
};
