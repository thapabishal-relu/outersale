import React from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { useOrganizations, usePagination, useFilters } from "@/hooks/useApi";
import { Organization } from "@/types";
import { Badge } from "@/components/ui/badge";

// Extended columns to show more organization data
const organizationColumns = [
  { key: "name", title: "Organization Name", width: "250px" },
  { key: "industries", title: "Industry", width: "200px" },
  { key: "estimated_num_employees", title: "Employees", width: "120px" },
  {
    key: "details_data",
    title: "Location",
    width: "200px",
    render: (value: Organization["details_data"], row: Organization) => {
      const { city, state, country } = value || {};
      return [city, state, country].filter(Boolean).join(", ") || "-";
    },
  },
  { key: "website_url", title: "Website", width: "200px" },
  {
    key: "primary_phone",
    title: "Phone",
    width: "150px",
    render: (value: Organization["primary_phone"]) =>
      value?.sanitized_number || "-",
  },
  // Additional columns to show more data
  {
    key: "founded_year",
    title: "Founded",
    width: "100px",
    render: (value: number) => value || "-",
  },
  {
    key: "organization_revenue_printed",
    title: "Revenue",
    width: "150px",
    render: (value: string) => value || "-",
  },
  {
    key: "keywords",
    title: "Keywords",
    width: "200px",
    render: (value: string[]) =>
      Array.isArray(value)
        ? value.slice(0, 3).join(", ") + (value.length > 3 ? "..." : "")
        : "-",
  },
  {
    key: "linkedin_url",
    title: "LinkedIn",
    width: "150px",
    render: (value: string) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          View Profile
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "created_at",
    title: "Created",
    width: "120px",
  },
  // More additional columns
  {
    key: "primary_domain",
    title: "Domain",
    width: "150px",
    render: (value: string) => value || "-",
  },
  {
    key: "facebook_url",
    title: "Facebook",
    width: "130px",
    render: (value: string) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          View Page
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "twitter_url",
    title: "Twitter",
    width: "130px",
    render: (value: string) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          View Profile
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "publicly_traded_symbol",
    title: "Stock Symbol",
    width: "130px",
    render: (value: string) => value || "-",
  },
  {
    key: "publicly_traded_exchange",
    title: "Exchange",
    width: "120px",
    render: (value: string) => value || "-",
  },
  {
    key: "logo_url",
    title: "Logo",
    width: "80px",
    render: (value: string) =>
      value ? (
        <img
          src={value}
          alt="Company Logo"
          className="w-8 h-8 rounded object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        "-"
      ),
  },
  {
    key: "organization_headcount_six_month_growth",
    title: "6M Growth",
    width: "100px",
    render: (value: number) =>
      value !== undefined && value !== null
        ? `${value > 0 ? "+" : ""}${value}%`
        : "-",
  },
  {
    key: "organization_headcount_twelve_month_growth",
    title: "12M Growth",
    width: "100px",
    render: (value: number) =>
      value !== undefined && value !== null
        ? `${value > 0 ? "+" : ""}${value}%`
        : "-",
  },
  {
    key: "organization_headcount_twenty_four_month_growth",
    title: "24M Growth",
    width: "100px",
    render: (value: number) =>
      value !== undefined && value !== null
        ? `${value > 0 ? "+" : ""}${value}%`
        : "-",
  },
  {
    key: "linkedin_uid",
    title: "LinkedIn UID",
    width: "120px",
    render: (value: string) => value || "-",
  },
  {
    key: "apollo_id",
    title: "Apollo ID",
    width: "120px",
    render: (value: string) => value || "-",
  },
  {
    key: "raw_address",
    title: "Full Address",
    width: "250px",
    render: (value: string) => value || "-",
  },
  {
    key: "show_intent",
    title: "Has Intent",
    width: "100px",
    render: (value: boolean) => (
      <Badge
        className={
          value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }
      >
        {value ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    key: "is_person_search_completed",
    title: "Person Search",
    width: "130px",
    render: (value: boolean) => (
      <Badge
        className={
          value ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
        }
      >
        {value ? "Completed" : "Pending"}
      </Badge>
    ),
  },
  {
    key: "details_data",
    title: "Industry Tags",
    width: "200px",
    render: (value: Organization["details_data"]) => {
      const tags = value?.secondary_industries || [];
      return Array.isArray(tags) && tags.length > 0
        ? tags.slice(0, 2).join(", ") + (tags.length > 2 ? "..." : "")
        : "-";
    },
  },
  {
    key: "details_data",
    title: "Retail Locations",
    width: "130px",
    render: (value: Organization["details_data"]) =>
      value?.retail_location_count || "-",
  },
  {
    key: "updated_at",
    title: "Last Updated",
    width: "120px",
  },
];

const Organizations = () => {
  const { pagination, goToPage, updatePagination } = usePagination();
  const { filters, updateFilters, resetFilters } = useFilters();

  const {
    data: organizationsData,
    isLoading,
    error,
  } = useOrganizations(pagination, filters);

  const organizations = organizationsData?.results ?? [];
  const totalCount = organizationsData?.count ?? 0;

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
