import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { FilterPanel } from "./FilterPanel";
import { TopHeader } from "./TopHeader";
import { cn } from "@/lib/utils";
import { FilterState } from "@/types";

interface LayoutProps {
  children: ReactNode;
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
  entityType: "organizations" | "people" | "task-mappings" | "task-results";
}

export const Layout = ({
  children,
  title,
  searchValue,
  onSearchChange,
  filters,
  onFiltersChange,
  onResetFilters,
  totalCount,
  entityType,
}: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterVisible, setFilterVisible] = useState(true);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status) count++;
    if (filters.industry?.length) count++;
    if (filters.employeeRange) count++;
    if (filters.dateRange?.start || filters.dateRange?.end) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          title={title}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onFilterToggle={() => setFilterVisible(!filterVisible)}
          isFilterVisible={filterVisible}
          totalCount={totalCount}
          activeFiltersCount={getActiveFiltersCount()}
        />

        {/* Content area with optional filter panel */}
        <div className="flex flex-1 min-h-0">
          {/* Filter Panel */}
          <FilterPanel
            isVisible={filterVisible}
            onToggle={() => setFilterVisible(!filterVisible)}
            filters={filters}
            onFiltersChange={onFiltersChange}
            onReset={onResetFilters}
            entityType={entityType}
          />

          {/* Main content */}
          <div className="flex-1 p-6 min-w-0 bg-slate-50">{children}</div>
        </div>
      </div>
    </div>
  );
};
