import React from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { useOrganizations, usePagination, useFilters } from "@/hooks/useApi";

const organizationColumns = [
  { key: "name", title: "Organization Name", width: "250px" },
  { key: "industry", title: "Industry", width: "200px" },
  { key: "number_of_employees", title: "Employees", width: "120px" },
  { key: "address", title: "Location", width: "200px" },
  { key: "website_url", title: "Website", width: "200px" },
  { key: "phone", title: "Phone", width: "150px" },
  { key: "created_at", title: "Created", width: "120px" },
];

const Organizations = () => {
  const { pagination, goToPage, updatePagination } = usePagination();
  const { filters, updateFilters, resetFilters } = useFilters();

  const {
    data: organizationsData,
    isLoading,
    error,
  } = useOrganizations(pagination, filters);

  const organizations = organizationsData?.data ?? [];
  const totalCount = organizationsData?.total ?? 0;

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
        title="Organizations"
        searchValue={filters.search}
        onSearchChange={(search) => updateFilters({ search })}
        filters={filters}
        onFiltersChange={updateFilters}
        onResetFilters={resetFilters}
        totalCount={0}
        entityType="organizations"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            {error.message || "Error loading organizations data"}
          </div>
        </div>
      </Layout>
    );
  }

  console.log("Organizations data:", {
    organizations,
    totalCount,
    isLoading,
    error,
    rawData: organizationsData,
  });

  return (
    <Layout
      title="Organizations"
      searchValue={filters.search}
      onSearchChange={(search) => updateFilters({ search })}
      filters={filters}
      onFiltersChange={updateFilters}
      onResetFilters={resetFilters}
      totalCount={totalCount}
      entityType="organizations"
    >
      <DataTable
        data={organizations}
        columns={organizationColumns}
        pagination={{ ...pagination, total: totalCount }}
        onPageChange={handlePageChange}
        entityType="organizations"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default Organizations;
