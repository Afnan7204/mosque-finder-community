
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string, filters: { school?: string }) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<string | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { school: selectedSchool });
  };
  
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(prev => prev === school ? undefined : school);
  };
  
  const clearFilters = () => {
    setSelectedSchool(undefined);
    onSearch(query, {});
  };
  
  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-20 py-3 rounded-l-full border-r-0 border-input bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Search mosques by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              aria-label="Filters"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="rounded-r-full rounded-l-none px-5"
          >
            Search
          </Button>
        </div>
        
        {isFiltersOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-elegant-lg border border-border p-4 animate-scale-in">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2 text-muted-foreground">School of Thought</h4>
                <div className="flex flex-wrap gap-2">
                  {["Shafi'i", "Hanafi", "Maliki", "Hanbali", "Other"].map((school) => (
                    <button
                      key={school}
                      type="button"
                      className={cn(
                        "px-3 py-1 text-sm rounded-full transition-all border",
                        selectedSchool === school
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => handleSchoolSelect(school)}
                    >
                      {school}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-border/50">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  className="text-sm text-primary font-medium hover:underline"
                  onClick={() => {
                    setIsFiltersOpen(false);
                    onSearch(query, { school: selectedSchool });
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
