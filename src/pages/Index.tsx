import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, FileText, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to organizations by default
    navigate("/organizations");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800">
            Outersale Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive data management platform for organizations, people,
            tasks, and results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Organizations",
              icon: Building2,
              path: "/organizations",
              count: "23+",
            },
            { title: "People", icon: Users, path: "/people", count: "12+" },
            {
              title: "Task Mappings",
              icon: FileText,
              path: "/task-mappings",
              count: "5+",
            },
            {
              title: "Task Results",
              icon: ClipboardList,
              path: "/task-results",
              count: "15+",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <item.icon className="h-6 w-6 text-slate-600" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold text-slate-800 mb-2">
                  {item.count}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View All
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-8">
          <Button
            size="lg"
            onClick={() => navigate("/organizations")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
