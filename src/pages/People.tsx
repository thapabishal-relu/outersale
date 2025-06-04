import React from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { usePeople, usePagination, useFilters } from "@/hooks/useApi";

const peopleColumns = [
  { key: "first_name", title: "Name", width: "200px" },
  { key: "title", title: "Job Title", width: "200px" },
  { key: "company", title: "Company", width: "200px" },
  { key: "email", title: "Email", width: "200px" },
  { key: "linkedin_url", title: "LinkedIn", width: "200px" },
  { key: "created_at", title: "Created", width: "120px" },
];

const People = () => {
  const { pagination, goToPage, updatePagination } = usePagination();
  const { filters, updateFilters, resetFilters } = useFilters();

  const { data: peopleData, isLoading, error } = usePeople(pagination, filters);

  const people = peopleData?.data ?? [];
  const totalCount = peopleData?.total ?? 0;

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

  console.log("People data:", {
    people,
    totalCount,
    isLoading,
    error,
    rawData: peopleData,
  });

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
