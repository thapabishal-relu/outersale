import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Building2,
  Users,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrganizationById } from "@/hooks/useApi";

const OrganizationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: organization, isLoading, error } = useOrganizationById(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Organization Not Found
          </h2>
          <p className="text-slate-600 mb-4">
            The organization you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/organizations")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizations
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/organizations")}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Organizations
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800">
                    {organization.name}
                  </h1>
                  <p className="text-slate-600">
                    {organization.industry?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Main Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization.phone && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Phone
                  </label>
                  <p className="text-slate-800">{organization.phone}</p>
                </div>
              )}
              {organization.website_url && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Website
                  </label>
                  <a
                    href={organization.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{organization.website_url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {organization.linkedin_url && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    LinkedIn
                  </label>
                  <a
                    href={organization.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <span>Company Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Employees
                </label>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-800">
                    {organization.number_of_employees || "Unknown"}
                  </span>
                </div>
              </div>
              {organization.founded_year && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Founded
                  </label>
                  <p className="text-slate-800">{organization.founded_year}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Outersale ID
                </label>
                <p className="text-slate-800 font-mono text-sm">
                  {/* {organization.outersale_id} */}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Address
                </label>
                <p className="text-slate-800">
                  {organization.address || organization.raw_address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Industry & Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Industry & Keywords</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {organization.industry && organization.industry.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Industries
                </label>
                <div className="flex flex-wrap gap-2">
                  {organization.industry.map((industry, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {organization.keywords && organization.keywords.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Keywords
                </label>
                <div className="flex flex-wrap gap-2">
                  {organization.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-slate-600"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Created At
              </label>
              <p className="text-slate-800">
                {new Date(organization.created_at.$date).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Updated At
              </label>
              <p className="text-slate-800">
                {new Date(organization.updated_at.$date).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Person Search Completed
              </label>
              <Badge
                className={
                  organization.is_person_search_completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              >
                {organization.is_person_search_completed ? "Yes" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationDetail;
