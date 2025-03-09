
import { useState } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadFieldProps {
  initialImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  mosqueId?: string;
}

export const ImageUploadField = ({ initialImageUrl, onImageUploaded, mosqueId }: ImageUploadFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Maximum file size: 1.5MB
  const MAX_FILE_SIZE = 1.5 * 1024 * 1024;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds 1.5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        toast({
          variant: "destructive",
          title: "File too large",
          description: `Maximum file size is 1.5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        });
        setUploading(false);
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const filePath = mosqueId 
        ? `${mosqueId}/mosque-image.${fileExt}` 
        : `temp-${Math.random().toString(36).substring(2, 11)}/mosque-image.${fileExt}`;
        
      const { error: uploadError, data } = await supabase.storage
        .from('mosque_images')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('mosque_images')
        .getPublicUrl(filePath);
        
      setImageUrl(publicUrlData.publicUrl);
      onImageUploaded(publicUrlData.publicUrl);
      
      toast({
        title: "Image uploaded successfully",
        description: "Your mosque image has been uploaded",
      });
    } catch (error: any) {
      setError(error.message || "There was an error uploading your image");
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "There was an error uploading your image",
      });
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="mosque-image">Mosque Image</Label>
      
      <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center text-center">
        {imageUrl ? (
          <div className="space-y-2 w-full">
            <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Mosque preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <label 
              htmlFor="mosque-image"
              className="cursor-pointer text-sm text-primary hover:underline"
            >
              Change image
            </label>
          </div>
        ) : (
          <label 
            htmlFor="mosque-image" 
            className="flex flex-col items-center justify-center py-6 cursor-pointer space-y-2 w-full"
          >
            <div className="p-3 bg-primary/10 rounded-full">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col items-center justify-center text-sm">
              <span className="font-medium">Add mosque image</span>
              <span className="text-muted-foreground text-xs">(Optional)</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Upload a photo of your mosque (max 1.5MB)
            </div>
          </label>
        )}
        
        <input
          id="mosque-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="hidden"
        />
      </div>
      
      {error && (
        <div className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {uploading && (
        <div className="text-sm text-muted-foreground animate-pulse">
          Uploading image...
        </div>
      )}
    </div>
  );
};
