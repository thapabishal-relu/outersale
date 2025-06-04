export interface TaskMapping {
  _id: {
    $oid: string;
  };
  outersale_url: string;
  created_at: {
    $date: string;
  };
  status: string;
  progress_dictionary: string;
  updated_at: {
    $date: string;
  };
}

export interface Organization {
  _id: {
    $oid: string;
  };
  name: string;
  linkedin_url: string;
  website_url: string;
  primary_domain: string;
  facebook_url: string;
  phone: string;
  outersale_url: string;
  number_of_employees: number;
  industry: string[];
  keywords: string[];
  founded_year: string;
  address: string;
  raw_address: string;
  company_size: string;
  is_person_search_completed: boolean;
  created_at: {
    $date: string;
  };
  updated_at: {
    $date: string;
  };
}

export interface Person {
  _id: {
    $oid: string;
  };
  first_name: string;
  last_name: string;
  linkedin_url: string | null;
  title: string;
  email_status: string;
  photo_url: string;
  email: string | null;
  company: string;
  organization_id: string;
  domain_name: string | null;
  created_at: {
    $date: string;
  };
  updated_at: {
    $date: string;
  };
  outersale_url: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface FilterState {
  search: string;
  status?: string;
  industry?: string[];
  employeeRange?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}
