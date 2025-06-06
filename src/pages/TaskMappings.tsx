import React from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { useTaskMappings, usePagination, useFilters } from "@/hooks/useApi";

const taskMappingColumns = [
  { key: "apollo_url", title: "Apollo URL", width: "300px" },
  { key: "status", title: "Status", width: "150px" },
  { key: "created_at", title: "Created", width: "120px" },
  { key: "updated_at", title: "Updated", width: "120px" },
];

const TaskMappings = () => {
  const { pagination, goToPage, updatePagination } = usePagination();
  const { filters, updateFilters, resetFilters } = useFilters();

  const {
    data: taskMappingsData,
    isLoading,
    error,
  } = useTaskMappings(pagination, filters);

  const taskMappings = taskMappingsData?.results ?? [];
  const totalCount = taskMappingsData?.count ?? 0;

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
        title="Task Mappings"
        searchValue={filters.search}
        onSearchChange={(search) => updateFilters({ search })}
        filters={filters}
        onFiltersChange={updateFilters}
        onResetFilters={resetFilters}
        totalCount={0}
        entityType="task-mappings"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            {error.message || "Error loading task mappings data"}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Task Mappings"
      searchValue={filters.search}
      onSearchChange={(search) => updateFilters({ search })}
      filters={filters}
      onFiltersChange={updateFilters}
      onResetFilters={resetFilters}
      totalCount={totalCount}
      entityType="task-mappings"
    >
      <DataTable
        data={taskMappings}
        columns={taskMappingColumns}
        pagination={{ ...pagination, total: totalCount }}
        onPageChange={handlePageChange}
        entityType="task-mappings"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default TaskMappings;
