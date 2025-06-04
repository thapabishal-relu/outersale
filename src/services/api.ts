import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import {
  ApiResponse,
  TaskMapping,
  Organization,
  Person,
  FilterState,
} from "@/types";
import {
  Outersale_OrganizationData,
  Outersale_PeopleData,
  outersale_task_mappingData,
} from "@/lib/mockdata";

const USE_MOCK_DATA = true;

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

    console.error("API Error:", error);
    return new Error(message);
  }

  async getTaskMappings(
    filters: FilterState
  ): Promise<ApiResponse<TaskMapping>> {
    if (USE_MOCK_DATA) {
      let data = outersale_task_mappingData;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        data = outersale_task_mappingData.filter((task) =>
          task.apollo_url?.toLowerCase().includes(searchTerm)
        );
      }
      return {
        data,
        total: data.length,
        page: 1,
        limit: data.length,
      };
    }
    const response = await this.api.get("chrome/data/", { params: filters });
    return response.data;
  }

  async getOrganizations(
    filters: FilterState
  ): Promise<ApiResponse<Organization>> {
    if (USE_MOCK_DATA) {
      let data = Outersale_OrganizationData;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        data = Outersale_OrganizationData.filter(
          (org) =>
            org.name?.toLowerCase().includes(searchTerm) ||
            org.industry?.some((ind) =>
              ind.toLowerCase().includes(searchTerm)
            ) ||
            org.address?.toLowerCase().includes(searchTerm)
        );
      }
      return {
        data,
        total: data.length,
        page: 1,
        limit: data.length,
      };
    }
    const response = await this.api.get("organizations/", { params: filters });
    return response.data;
  }

  async getOrganizationById(id: string): Promise<Organization | null> {
    if (USE_MOCK_DATA) {
      const org = Outersale_OrganizationData.find(
        (org) => org._id.$oid === id || org.apollo_id === id
      );
      return org || null;
    }
    try {
      const response = await this.api.get(`organizations/${id}`);
      return response.data || null;
    } catch (error) {
      this.handleApiError(error);
      return null;
    }
  }

  async getPeople(filters: FilterState): Promise<ApiResponse<Person>> {
    if (USE_MOCK_DATA) {
      let data = Outersale_PeopleData;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        data = Outersale_PeopleData.filter(
          (person) =>
            person.first_name?.toLowerCase().includes(searchTerm) ||
            person.last_name?.toLowerCase().includes(searchTerm) ||
            person.company?.toLowerCase().includes(searchTerm) ||
            person.title?.toLowerCase().includes(searchTerm) ||
            person.email?.toLowerCase().includes(searchTerm)
        );
      }
      return {
        data,
        total: data.length,
        page: 1,
        limit: data.length,
      };
    }
    const response = await this.api.get("people/", { params: filters });
    return response.data;
  }

  async getPersonById(id: string): Promise<Person | null> {
    if (USE_MOCK_DATA) {
      const person = Outersale_PeopleData.find(
        (person) => person._id.$oid === id || person.apollo_id === id
      );
      return person || null;
    }
    try {
      const response = await this.api.get(`people/${id}`);
      return response.data || null;
    } catch (error) {
      this.handleApiError(error);
      return null;
    }
  }

  async getOrganizationForPerson(
    organizationId: string
  ): Promise<Organization | null> {
    if (USE_MOCK_DATA) {
      const org = Outersale_OrganizationData.find(
        (org) => org._id.$oid === organizationId
      );
      return org || null;
    }
    return this.getOrganizationById(organizationId);
  }

  async getPeopleByOrganization(organizationId: string): Promise<Person[]> {
    if (USE_MOCK_DATA) {
      return Outersale_PeopleData.filter(
        (person) => person.organization_id === organizationId
      );
    }
    const response = await this.api.get(
      `organizations/${organizationId}/people`
    );
    return response.data;
  }

  async searchPeople(query: string): Promise<Person[]> {
    if (USE_MOCK_DATA) {
      const searchTerm = query.toLowerCase();
      return Outersale_PeopleData.filter(
        (person) =>
          person.first_name?.toLowerCase().includes(searchTerm) ||
          person.last_name?.toLowerCase().includes(searchTerm) ||
          person.company?.toLowerCase().includes(searchTerm) ||
          person.title?.toLowerCase().includes(searchTerm) ||
          person.email?.toLowerCase().includes(searchTerm)
      );
    }
    const response = await this.api.get("people/search", { params: { query } });
    return response.data;
  }

  async searchOrganizations(query: string): Promise<Organization[]> {
    if (USE_MOCK_DATA) {
      const searchTerm = query.toLowerCase();
      return Outersale_OrganizationData.filter(
        (org) =>
          org.name?.toLowerCase().includes(searchTerm) ||
          org.industry?.some((ind) => ind.toLowerCase().includes(searchTerm)) ||
          org.address?.toLowerCase().includes(searchTerm)
      );
    }
    const response = await this.api.get("organizations/search", {
      params: { query },
    });
    return response.data;
  }
}

export const apiService = new ApiService();
