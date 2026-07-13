"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Briefcase,
  Users,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Globe,
  Bell,
  Menu,
  X,
  FileText,
  CalendarDays,
  Target,
  Mail,
  HelpCircle,
  PhoneCall,
  ShieldCheck
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [userRole, setUserRole] = useState("admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      const userInfoStr = localStorage.getItem("user_info");
      if (!token) {
        router.push("/signin"); 
      } else {
        setIsAuthorized(true);
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            setUserRole(userInfo.role || "admin");
          } catch(e) {}
        }
      }
    }
  }, [router]);

  // Route Guard to prevent URL tampering
  useEffect(() => {
    if (!isAuthorized) return;
    
    const roleRestrictions: Record<string, string[]> = {
      hr: ["/dashboard", "/dashboard/jobs", "/dashboard/applications"],
      sales: ["/dashboard", "/dashboard/crm", "/dashboard/meetings", "/dashboard/enquiries"],
      editor: ["/dashboard", "/dashboard/blogs", "/dashboard/portfolio", "/dashboard/testimonials", "/dashboard/services"],
      viewer: ["/dashboard"]
    };

    if (userRole === "client") {
      router.push("/client");
      return;
    }

    if (userRole !== "admin") {
      const permittedPaths = roleRestrictions[userRole] || ["/dashboard"];
      const isPermitted = permittedPaths.some(path => pathname === path || pathname.startsWith(path + "/"));
      if (!isPermitted) {
        router.push("/dashboard");
      }
    }
  }, [pathname, userRole, isAuthorized, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001341]"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_info");
    router.push("/signin");
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Team Access", href: "/dashboard/access-control", icon: ShieldCheck },
    { name: "Email Logs", href: "/dashboard/email_logs", icon: Mail },
    { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Target },
    { name: "Services", href: "/dashboard/services", icon: Target },
    { name: "CRM / Leads", href: "/dashboard/crm", icon: Users },
    { name: "Client Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Meetings", href: "/dashboard/meetings", icon: CalendarDays },
    { name: "Blog Posts", href: "/dashboard/blogs", icon: FileText },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: ImageIcon },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Applications", href: "/dashboard/applications", icon: Users },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
    { name: "Newsletters", href: "/dashboard/newsletters", icon: Mail },
    { name: "Enquiries", href: "/dashboard/enquiries", icon: PhoneCall },
    { name: "Short Links", href: "/dashboard/links", icon: Globe },
    { name: "Webhook Logs", href: "/dashboard/webhook_logs", icon: Globe },
    { name: "Activity Logs", href: "/dashboard/logs", icon: BarChart3 },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (userRole === "admin") return true;
    
    const permittedMap: Record<string, string[]> = {
      hr: ["Overview", "Jobs", "Applications"],
      sales: ["Overview", "CRM / Leads", "Meetings", "Enquiries"],
      editor: ["Overview", "Blog Posts", "Portfolio", "Testimonials", "Services"],
      viewer: ["Overview"]
    };

    const permittedNames = permittedMap[userRole] || ["Overview"];
    return permittedNames.includes(item.name);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#001341]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-screen
      `}>
        <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#001341] to-[#5271ff] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <h1 className="font-black text-[#001341] text-lg leading-none">AICLEX</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Workspace: {userRole.toUpperCase()}</p>
            </div>
          </Link>
          <button className="lg:hidden p-2 text-gray-400 hover:text-[#001341] rounded-xl hover:bg-gray-50" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 group
                  ${isActive 
                    ? "bg-[#001341] text-white shadow-lg shadow-blue-900/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#001341]"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} className={isActive ? "text-blue-300" : "text-gray-400 group-hover:text-[#5271ff]"} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-50 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors"
          >
            <LogOut size={18} />
            Logout Securely
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white border-b border-gray-100 h-20 shrink-0 flex items-center justify-between px-6 lg:px-10 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-[#001341] rounded-xl hover:bg-gray-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="hidden lg:block text-lg font-black text-[#001341]">Welcome back, Admin 👋</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICATIONS */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#001341] transition-colors relative"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-50"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,19,65,0.1)] border border-gray-100 py-4 z-50">
                  <div className="px-4 pb-3 border-b border-gray-50 mb-2">
                    <h3 className="font-black text-[#001341] text-sm">Notifications</h3>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">New lead received</p>
                    <p className="text-[10px] text-gray-500 mt-1">2 mins ago</p>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">New meeting booked by Rohan</p>
                    <p className="text-[10px] text-gray-500 mt-1">1 hour ago</p>
                  </div>
                  <div className="px-4 pt-3 mt-2 border-t border-gray-50 text-center">
                    <Link href="/dashboard/crm" className="text-xs font-bold text-[#5271ff] hover:underline">View all</Link>
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#5271ff] font-black border border-blue-100 transition-transform hover:scale-105"
              >
                U
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,19,65,0.1)] border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 mb-2">
                    <p className="text-sm font-black text-[#001341]">Umesh Kumar</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin</p>
                  </div>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#001341]">
                    <Settings size={14} /> Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 text-left">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
