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
  id: string;
  name: string;
  linkedin_url: string;
  website_url: string;
  primary_domain: string;
  facebook_url: string;
  twitter_url: string;
  primary_phone: {
    number: string;
    source: string;
    sanitized_number: string;
  };
  phone: string;
  linkedin_uid: string;
  founded_year: number;
  publicly_traded_symbol: string;
  publicly_traded_exchange: string;
  logo_url: string;
  sanitized_phone: string;
  owned_by_organization_id: string | null;
  organization_revenue_printed: string;
  organization_revenue: number;
  intent_strength: null; // Adjust based on data
  show_intent: boolean;
  has_intent_signal_account: boolean;
  intent_signal_account: null; // Adjust based on data
  organization_headcount_six_month_growth: number;
  organization_headcount_twelve_month_growth: number;
  organization_headcount_twenty_four_month_growth: number;
  details_data: {
    id: string;
    industry: string;
    estimated_num_employees: number;
    keywords: string[];
    industries: string[];
    secondary_industries: string[];
    snippets_loaded: boolean;
    industry_tag_id: string;
    industry_tag_hash: {
      [key: string]: string;
    };
    retail_location_count: number;
    raw_address: string;
    street_address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string | null;
  };
  estimated_num_employees: number;
  industries: string[];
  keywords: string[];
  raw_address: string;
  apollo_id: string;
  is_person_search_completed: boolean;
  created_at: {
    $date: string;
  };
  updated_at: {
    $date: string;
  };
}

export interface EmploymentHistory {
  _id: string;
  created_at: string | null;
  current: boolean;
  degree: string | null;
  description: string | null;
  emails: string[] | null;
  end_date: string | null;
  grade_level: string | null;
  kind: string | null;
  major: string | null;
  organization_id: string | null;
  organization_name: string;
  raw_address: string | null;
  start_date: string;
  title: string;
  updated_at: string | null;
  id: string;
  key: string;
}

export interface Person {
  _id: {
    $oid: string;
  };
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  linkedin_url: string | null;
  title: string;
  email_status: string;
  photo_url: string;
  twitter_url: string | null;
  github_url: string | null;
  facebook_url: string | null;
  extrapolated_email_confidence: number | null;
  headline: string;
  email: string;
  organization_id: string;
  employment_history: EmploymentHistory[];
  state: string;
  city: string;
  country: string;
  organization: {
    id: string;
    name: string;
    website_url: string;
    linkedin_url: string;
    twitter_url: string;
    facebook_url: string;
    primary_phone: {
      number: string;
      source: string;
      sanitized_number: string;
    };
    alexa_ranking: number;
    phone: string;
    linkedin_uid: string;
    founded_year: number;
    publicly_traded_symbol: string;
    publicly_traded_exchange: string;
    logo_url: string;
    primary_domain: string;
    sanitized_phone: string;
    organization_headcount_six_month_growth: number;
    organization_headcount_twelve_month_growth: number;
    organization_headcount_twenty_four_month_growth: number;
  };
  departments: string[];
  subdepartments: string[];
  seniority: string;
  functions: string[];
  intent_strength: null; // Adjust based on data
  show_intent: boolean;
  email_domain_catchall: boolean;
  revealed_for_current_team: boolean;
  domain_name: string;
  created_at: {
    $date: string;
  };
  updated_at: {
    $date: string;
  };
  apollo_id: string;
}
export interface ApiResponse<T> {
  count: number; // Total count (not "total")
  next: string | null; // Next page URL
  previous: string | null; // Previous page URL
  results: T[]; // Data array (not "rawdata")
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
