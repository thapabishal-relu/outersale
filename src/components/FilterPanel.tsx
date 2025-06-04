import { useState } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FilterState } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface FilterPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  entityType: "organizations" | "people" | "task-mappings" | "task-results";
}

export const FilterPanel = ({
  isVisible,
  onToggle,
  filters,
  onFiltersChange,
  onReset,
  entityType,
}: FilterPanelProps) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
  };

  const handleResetFilters = () => {
    setTempFilters({ search: "" });
    onReset();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status) count++;
    if (filters.industry?.length) count++;
    if (filters.employeeRange) count++;
    if (filters.dateRange?.start || filters.dateRange?.end) count++;
    return count;
  };

  const renderOrganizationFilters = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select
          value={tempFilters.industry?.[0] || ""}
          onValueChange={(value) =>
            setTempFilters((prev) => ({
              ...prev,
              industry: value ? [value] : [],
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="food production">Food Production</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employees">Employee Range</Label>
        <Select
          value={tempFilters.employeeRange || ""}
          onValueChange={(value) =>
            setTempFilters((prev) => ({ ...prev, employeeRange: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employee range" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-1000">201-1000 employees</SelectItem>
            <SelectItem value="1000+">1000+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderPeopleFilters = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          placeholder="e.g. Manager, Engineer"
          value={tempFilters.search || ""}
          onChange={(e) =>
            setTempFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Company name" className="bg-white" />
      </div>
    </>
  );

  const renderTaskFilters = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={tempFilters.status || ""}
          onValueChange={(value) =>
            setTempFilters((prev) => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date From */}
      <div className="space-y-2">
        <Label htmlFor="date-from">Date From</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !tempFilters.dateRange?.start && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {tempFilters.dateRange?.start
                ? format(new Date(tempFilters.dateRange.start), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                tempFilters.dateRange?.start
                  ? new Date(tempFilters.dateRange.start)
                  : undefined
              }
              onSelect={(date) =>
                setTempFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    start: date ? date.toISOString() : "",
                  },
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Date To */}
      <div className="space-y-2">
        <Label htmlFor="date-to">Date To</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !tempFilters.dateRange?.end && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {tempFilters.dateRange?.end
                ? format(new Date(tempFilters.dateRange.end), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                tempFilters.dateRange?.end
                  ? new Date(tempFilters.dateRange.end)
                  : undefined
              }
              onSelect={(date) =>
                setTempFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    end: date ? date.toISOString() : "",
                  },
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      <Card className="rounded-none border-0 shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-lg">Filters</CardTitle>
              {getActiveFilterCount() > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {getActiveFilterCount()}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search..."
              value={tempFilters.search || ""}
              onChange={(e) =>
                setTempFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="bg-white"
            />
          </div>

          <Separator />

          {entityType === "organizations" && renderOrganizationFilters()}
          {entityType === "people" && renderPeopleFilters()}
          {(entityType === "task-mappings" || entityType === "task-results") &&
            renderTaskFilters()}

          <Separator />

          <div className="flex space-x-2">
            <Button
              onClick={handleApplyFilters}
              className="flex-1  text-slate-900 bg-blue-200 hover:bg-blue-300 border-2 border-blue-100"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
