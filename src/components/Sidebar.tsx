import { NavLink, useLocation } from "react-router-dom";
import {
  Users,
  Building2,
  FileText,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "People", href: "/people", icon: Users },
  { name: "Task Mappings", href: "/task-mappings", icon: FileText },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-[12px] p-1">
                  Outer
                </span>
              </div>
              <span className="font-semibold text-slate-800">
                Outersale Dashboard
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-slate-200"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      {/* <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-500 border border-blue-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-500"
              )}
            >
              <item.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav> */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center py-2 rounded-lg text-sm font-medium transition-colors",
                isCollapsed ? "justify-center px-2" : "px-3",
                isActive
                  ? "bg-blue-100 text-blue-500 border border-blue-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-500"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
