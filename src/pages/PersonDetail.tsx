import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  User,
  Building2,
  Mail,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePersonById } from "@/hooks/useApi";

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: person, isLoading, error } = usePersonById(id!);

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

  if (error || !person) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Person Not Found
          </h2>
          <p className="text-slate-600 mb-4">
            The person you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/people")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to People
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
                onClick={() => navigate("/people")}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to People
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-4">
                {person.photo_url ? (
                  <img
                    src={person.photo_url}
                    alt={`${person.first_name} ${person.last_name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800">
                    {person.first_name} {person.last_name}
                  </h1>
                  <p className="text-slate-600">{person.title}</p>
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
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {person.email ? (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Email
                  </label>
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{person.email}</span>
                  </a>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Email
                  </label>
                  <p className="text-slate-500">Not available</p>
                </div>
              )}

              {person.linkedin_url && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    LinkedIn
                  </label>
                  <a
                    href={person.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Email Status
                </label>
                <Badge
                  className={
                    person.email_status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {person.email_status || "Unknown"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <span>Professional Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Job Title
                </label>
                <p className="text-slate-800 font-medium">{person.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Company
                </label>
                <p className="text-slate-800">{person.company}</p>
              </div>

              {person.domain_name && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Company Domain
                  </label>
                  <p className="text-slate-800">{person.domain_name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-purple-600" />
                <span>System Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Outersale ID
                </label>
                <p className="text-slate-800 font-mono text-sm">
                  {/* {person && person.outersale} */}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Organization ID
                </label>
                <p className="text-slate-800 font-mono text-sm">
                  {person.organization_id}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photo Section */}
        {person.photo_url && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <img
                  src={person.photo_url}
                  alt={`${person.first_name} ${person.last_name}`}
                  className="w-24 h-24 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <p className="text-slate-600">Profile photo from LinkedIn</p>
                  <a
                    href={person.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                  >
                    <span>View full size</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                {new Date(person.created_at.$date).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Updated At
              </label>
              <p className="text-slate-800">
                {new Date(person.updated_at.$date).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonDetail;
