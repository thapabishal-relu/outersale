import React from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { usePeople, usePagination, useFilters } from "@/hooks/useApi";
import { Person, PaginationState } from "@/types";
import { User, ExternalLink } from "lucide-react";

const peopleColumns = [
  {
    key: "first_name",
    title: "Name",
    width: "200px",
    render: (value: string, row: Person) => (
      <div className="flex items-center space-x-2">
        <User className="h-4 w-4 text-slate-400" />
        <span className="font-medium">{`${row.first_name} ${row.last_name}`}</span>
      </div>
    ),
  },
  {
    key: "title",
    title: "Job Title",
    width: "200px",
    render: (value: string) => value || "-",
  },
  {
    key: "organization.name",
    title: "Company",
    width: "200px",
    render: (value: string) => value || "-",
  },
  {
    key: "email",
    title: "Email",
    width: "200px",
    render: (value: string) => value || "-",
  },
  {
    key: "linkedin_url",
    title: "LinkedIn",
    width: "200px",
    render: (value: string | null) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate max-w-[200px]">{value}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "seniority",
    title: "Seniority",
    width: "150px",
    render: (value: string) => (
      <span className="capitalize">{value || "-"}</span>
    ),
  },
  {
    key: "departments",
    title: "Departments",
    width: "200px",
    render: (value: string[]) =>
      Array.isArray(value) && value.length > 0 ? value.join(", ") : "-",
  },
  {
    key: "location",
    title: "Location",
    width: "200px",
    render: (value: any, row: Person) => {
      const { city, state, country } = row;
      return [city, state, country].filter(Boolean).join(", ") || "-";
    },
  },
  {
    key: "created_at",
    title: "Created",
    width: "120px",
    render: (value: { $date: string }) =>
      value?.$date ? new Date(value.$date).toLocaleDateString() : "-",
  },
];

const People = () => {
  const { pagination, goToPage, updatePagination } = usePagination();
  const { filters, updateFilters, resetFilters } = useFilters();
  const { data: peopleData, isLoading, error } = usePeople(pagination, filters);

  const people = peopleData?.results ?? [];
  const totalCount = peopleData?.count ?? 0;

  React.useEffect(() => {
    if (totalCount !== pagination.total) {
      updatePagination({ total: totalCount });
    }
  }, [totalCount, pagination.total, updatePagination]);

  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  if (error) {
    return (
      <Layout
        title="People"
        searchValue={filters.search}
        onSearchChange={(search) => updateFilters({ search })}
        filters={filters}
        onFiltersChange={updateFilters}
        onResetFilters={resetFilters}
        totalCount={0}
        entityType="people"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            {error.message || "Error loading people data"}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="People"
      searchValue={filters.search}
      onSearchChange={(search) => updateFilters({ search })}
      filters={filters}
      onFiltersChange={updateFilters}
      onResetFilters={resetFilters}
      totalCount={totalCount}
      entityType="people"
    >
      <DataTable
        data={people}
        columns={peopleColumns}
        pagination={{ ...pagination, total: totalCount }}
        onPageChange={handlePageChange}
        entityType="people"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default People;
