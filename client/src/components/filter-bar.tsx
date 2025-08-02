import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  onFilter: (filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  }) => void;
}

const categories = [
  { value: "", label: "All Categories", icon: "🎮" },
  { value: "action", label: "Action", icon: "⚔️" },
  { value: "rpg", label: "RPG", icon: "🧙‍♂️" },
  { value: "strategy", label: "Strategy", icon: "🧠" },
  { value: "simulation", label: "Simulation", icon: "🌍" },
  { value: "indie", label: "Indie", icon: "💜" },
  { value: "horror", label: "Horror", icon: "👻" },
  { value: "arcade", label: "Arcade", icon: "🕹️" },
];

const priceRanges = [
  { value: "", label: "Any Price" },
  { value: "0-5", label: "Under $5" },
  { value: "5-15", label: "$5 - $15" },
  { value: "15-30", label: "$15 - $30" },
  { value: "30-60", label: "$30 - $60" },
  { value: "60+", label: "$60+" },
];

const sortOptions = [
  { value: "newest", label: "⏰ Newest First" },
  { value: "price-low", label: "💰 Price: Low to High" },
  { value: "price-high", label: "💎 Price: High to Low" },
  { value: "title", label: "🔤 Alphabetical" },
];

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const applyFilters = () => {
    const [minPrice, maxPrice] = priceRange.split("-");
    onFilter({
      category,
      minPrice: minPrice || "",
      maxPrice: maxPrice === "+" ? "" : maxPrice || "",
      sortBy,
    });
  };

  const clearFilters = () => {
    setCategory("");
    setPriceRange("");
    setSortBy("newest");
    onFilter({
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = category || priceRange || sortBy !== "newest";

  return (
    <div className="bg-card border-b border-border py-4 sticky top-16 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {hasActiveFilters && <Badge className="ml-2">Active</Badge>}
          </Button>
        </div>

        {/* Filter Controls */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block`}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex flex-wrap gap-4 flex-1">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48 gaming-input">
                  <SelectValue placeholder="🎮 Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full sm:w-48 gaming-input">
                  <SelectValue placeholder="💰 Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 gaming-input">
                  <SelectValue placeholder="🔀 Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={applyFilters} className="gaming-button text-white flex-1 sm:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="flex-1 sm:flex-none">
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories.find(c => c.value === category)?.icon} {categories.find(c => c.value === category)?.label}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive" 
                    onClick={() => setCategory("")}
                  />
                </Badge>
              )}
              {priceRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  💰 {priceRanges.find(p => p.value === priceRange)?.label}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive" 
                    onClick={() => setPriceRange("")}
                  />
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {sortOptions.find(s => s.value === sortBy)?.label}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive" 
                    onClick={() => setSortBy("newest")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}