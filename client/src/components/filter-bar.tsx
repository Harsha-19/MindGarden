import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  onFilter: (filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  }) => void;
}

const categories = [
  { value: "", label: "All Categories" },
  { value: "action", label: "Action" },
  { value: "rpg", label: "RPG" },
  { value: "strategy", label: "Strategy" },
  { value: "simulation", label: "Simulation" },
  { value: "indie", label: "Indie" },
  { value: "horror", label: "Horror" },
  { value: "arcade", label: "Arcade" },
];

const priceRanges = [
  { value: "", label: "Any Price" },
  { value: "0-10", label: "Under $10" },
  { value: "10-30", label: "$10 - $30" },
  { value: "30-60", label: "$30 - $60" },
  { value: "60+", label: "$60+" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "title", label: "Alphabetical" },
];

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, selectedPriceRange, selectedSort);
  };

  const handlePriceChange = (priceRange: string) => {
    setSelectedPriceRange(priceRange);
    applyFilters(selectedCategory, priceRange, selectedSort);
  };

  const handleSortChange = (sortBy: string) => {
    setSelectedSort(sortBy);
    applyFilters(selectedCategory, selectedPriceRange, sortBy);
  };

  const applyFilters = (category: string, priceRange: string, sortBy: string) => {
    let minPrice = "";
    let maxPrice = "";

    if (priceRange) {
      if (priceRange === "60+") {
        minPrice = "60";
      } else if (priceRange.includes("-")) {
        const [min, max] = priceRange.split("-");
        minPrice = min;
        maxPrice = max;
      } else {
        maxPrice = priceRange;
      }
    }

    onFilter({
      category,
      minPrice,
      maxPrice,
      sortBy,
    });
  };

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Categories */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600">Categories:</span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(1).map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category.value)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600">Price:</span>
            <Select value={selectedPriceRange} onValueChange={handlePriceChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-sm font-medium text-slate-600">Sort by:</span>
            <Select value={selectedSort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
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
        </div>
      </div>
    </div>
  );
}
