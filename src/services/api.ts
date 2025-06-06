import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import {
  ApiResponse,
  TaskMapping,
  Organization,
  Person,
  FilterState,
  PaginationState,
} from "@/types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        console.log(
          `API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleApiError(error: any) {
    let message = "An unexpected error occurred";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          message = data.message || "Bad request";
          break;
        case 401:
          message = "Unauthorized access";
          break;
        case 403:
          message = "Access forbidden";
          break;
        case 404:
          message = "Resource not found";
          break;
        case 500:
          message = "Internal server error";
          break;
        default:
          message = data.message || `Error ${status}`;
      }
    } else if (error.request) {
      message = "Network error - please check your connection";
    }

    toast({
      title: "API Error",
      description: message,
      variant: "destructive",
    });

    return new Error(message);
  }

  async getOrganizations(
    filters: FilterState,
    pagination?: PaginationState
  ): Promise<ApiResponse<Organization>> {
    const params = {
      ...filters,
      ...(pagination && {
        page: pagination.page,
        page_size: pagination.limit,
      }),
    };
    const response = await this.api.get("organizations/", { params });
    return response.data;
  }

  async getOrganizationById(id: string): Promise<Organization | null> {
    try {
      const response = await this.api.get(`organizations/${id}/`);
      return response.data || null;
    } catch (error) {
      this.handleApiError(error);
      return null;
    }
  }

  async searchOrganizations(query: string): Promise<Organization[]> {
    try {
      const response = await this.api.get("organizations/search/", {
        params: { query },
      });
      return response.data || [];
    } catch (error) {
      this.handleApiError(error);
      return [];
    }
  }

  async getOrganizationForPerson(
    organizationId: string
  ): Promise<Organization | null> {
    return this.getOrganizationById(organizationId);
  }

  async getPeople(
    filters: FilterState,
    pagination?: PaginationState
  ): Promise<ApiResponse<Person>> {
    const params = {
      ...filters,
      ...(pagination && {
        page: pagination.page,
        page_size: pagination.limit, // Django uses 'page_size', not 'limit'
      }),
    };
    const response = await this.api.get("people/", { params });
    return response.data;
  }

  async getPersonById(id: string): Promise<Person | null> {
    try {
      const response = await this.api.get(`people/${id}/`);
      return response.data || null;
    } catch (error) {
      this.handleApiError(error);
      return null;
    }
  }

  async getPeopleByOrganization(organizationId: string): Promise<Person[]> {
    try {
      const response = await this.api.get(
        `people/by-organization/${organizationId}/`
      );
      return response.data || [];
    } catch (error) {
      this.handleApiError(error);
      return [];
    }
  }

  async getTaskMappings(
    filters: FilterState,
    pagination?: PaginationState
  ): Promise<ApiResponse<TaskMapping>> {
    const params = {
      ...filters,
      ...(pagination && {
        page: pagination.page,
        page_size: pagination.limit,
      }),
    };
    const response = await this.api.get("chrome/data/", { params });
    return response.data;
  }
}

export const apiService = new ApiService();
