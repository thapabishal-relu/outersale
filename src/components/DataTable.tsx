import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Building2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskMapping, Organization, Person, PaginationState } from "@/types";

type TableData = TaskMapping | Organization | Person;

interface Column {
  key: string;
  title: string;
  render?: (value: any, row: TableData) => ReactNode;
  width?: string;
}

interface DataTableProps {
  data: TableData[];
  columns: Column[];
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  entityType: "organizations" | "people" | "task-mappings" | "task-results";
  isLoading?: boolean;
}

export const DataTable = ({
  data,
  columns,
  pagination,
  onPageChange,
  entityType,
  isLoading = false,
}: DataTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (row: TableData) => {
    const id = row._id?.$oid || row._id || row.id;
    if (!id) return;
    if (entityType === "organizations") {
      navigate(`/organizations/${id}`);
    } else if (entityType === "people") {
      navigate(`/people/${id}`);
    }
  };

  const formatDate = (dateObj: { $date: string }) => {
    return new Date(dateObj.$date).toLocaleDateString();
  };

  const formatStatus = (status: string) => {
    const statusColors: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      in_progress: "bg-blue-100 text-blue-700",
      failed: "bg-red-100 text-red-700",
      completed_with_people: "bg-green-100 text-green-700",
    };

    return (
      <Badge
        className={cn(
          "text-xs",
          statusColors[status] || "bg-gray-100 text-gray-700"
        )}
      >
        {status.replace(/_/g, " ").toUpperCase()}
      </Badge>
    );
  };

  const renderCellContent = (column: Column, row: TableData) => {
    const value = (row as any)[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    // Default rendering based on column key
    switch (column.key) {
      case "created_at":
      case "updated_at":
        return value?.$date ? formatDate(value) : "-";

      case "status":
        return formatStatus(value);

      case "name":
        return (
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span className="font-medium">{value}</span>
          </div>
        );

      case "first_name": {
        const person = row as Person;
        return (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="font-medium">{`${person.first_name} ${person.last_name}`}</span>
          </div>
        );
      }

      case "website_url":
      case "linkedin_url":
      case "twitter_url":
      case "facebook_url":
        return value ? (
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
        );

      case "industries":
        return Array.isArray(value) ? value.join(", ") : value || "-";

      case "keywords":
        return Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1">
            {value.slice(0, 2).map((keyword: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {value.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{value.length - 2}
              </Badge>
            )}
          </div>
        ) : (
          value || "-"
        );

      case "estimated_num_employees":
        return value || "-";

      default:
        return value || "-";
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="max-h-[80vh] overflow-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-slate-50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="font-light uppercase text-slate-500 text-xs"
                  style={{ width: column.width }}
                >
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row._id?.$oid || row.id || index}
                className={cn(
                  "cursor-pointer hover:bg-slate-50 transition-colors",
                  (entityType === "organizations" || entityType === "people") &&
                    "hover:bg-blue-50"
                )}
                onClick={() => handleRowClick(row)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="py-4 whitespace-nowrap"
                  >
                    {renderCellContent(column, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-600">
          Showing {startItem} to {endItem} of {pagination.total} results
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNumber = Math.max(1, pagination.page - 2) + i;
              if (pageNumber > totalPages) return null;

              return (
                <Button
                  key={pageNumber}
                  variant={
                    pageNumber === pagination.page ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => onPageChange(pageNumber)}
                  className="w-8 h-8 p-0"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
