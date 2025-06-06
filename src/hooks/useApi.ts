import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import {
  TaskMapping,
  Organization,
  Person,
  ApiResponse,
  FilterState,
  PaginationState,
} from "@/types";
import { debounce } from "lodash"; // Ensure lodash is installed

export const usePeople = (
  pagination: PaginationState,
  filters: FilterState
) => {
  return useQuery({
    queryKey: ["people", pagination, filters],
    queryFn: () => apiService.getPeople(filters, pagination), // Pass pagination
  });
};

export const useOrganizations = (
  pagination: PaginationState,
  filters: FilterState
) => {
  return useQuery({
    queryKey: ["organizations", pagination, filters],
    queryFn: () => apiService.getOrganizations(filters, pagination), // Pass pagination
  });
};

export const useTaskMappings = (
  pagination: PaginationState,
  filters: FilterState
) => {
  return useQuery({
    queryKey: ["taskMappings", pagination, filters],
    queryFn: () => apiService.getTaskMappings(filters, pagination), // Pass pagination
  });
};

export const useOrganizationById = (id: string) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => apiService.getOrganizationById(id),
    enabled: !!id,
  });
};

export const usePagination = (initialPage = 1, initialLimit = 20) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
  });

  const updatePagination = (updates: Partial<PaginationState>) => {
    setPagination((prev) => ({ ...prev, ...updates }));
  };

  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const nextPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, Math.ceil(prev.total / prev.limit)),
    }));
  };

  const prevPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };

  return {
    pagination,
    updatePagination,
    goToPage,
    nextPage,
    prevPage,
  };
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({ search: "" });

  const updateFilters = debounce((updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, 300);

  const resetFilters = () => {
    setFilters({ search: "" });
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};

export const usePersonById = (id: string) => {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => apiService.getPersonById(id),
    enabled: !!id,
  });
};

export const usePeopleByOrganization = (organizationId: string) => {
  return useQuery({
    queryKey: ["people", "organization", organizationId],
    queryFn: () => apiService.getPeopleByOrganization(organizationId),
    enabled: !!organizationId,
  });
};
