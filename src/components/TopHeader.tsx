import { useState } from "react";
import { Search, Filter, Plus, Download, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TopHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
  isFilterVisible: boolean;
  totalCount: number;
  activeFiltersCount: number;
}

export const TopHeader = ({
  title,
  searchValue,
  onSearchChange,
  onFilterToggle,
  isFilterVisible,
  totalCount,
  activeFiltersCount,
}: TopHeaderProps) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
            <p className="text-sm text-slate-600 mt-1">
              {totalCount.toLocaleString()} total records
            </p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div
            className={cn(
              "relative transition-all duration-200",
              searchFocused && "transform scale-105"
            )}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search across all fields..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="pl-10 pr-4 py-2 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            className={cn(
              "relative",
              isFilterVisible && "bg-blue-50 border-blue-200 text-blue-700"
            )}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-600 text-white text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button
            size="sm"
            className="flex-1  text-slate-900 bg-blue-200 hover:bg-blue-300 border-2 border-blue-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
