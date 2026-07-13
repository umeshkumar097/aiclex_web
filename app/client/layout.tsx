"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Target
} from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      const userInfoStr = localStorage.getItem("user_info");
      
      if (!token || !userInfoStr) {
        router.push("/signin"); 
      } else {
        const userInfo = JSON.parse(userInfoStr);
        // Clients, admins, and team staff can access client portal
        if (userInfo.role) {
          setUser(userInfo);
          setIsAuthorized(true);
        } else {
          router.push("/signin");
        }
      }
    }
  }, [router]);

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
    { name: "My Subscriptions", href: "/client", icon: Target },
    { name: "Settings", href: "/client/settings", icon: Settings },
  ];

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
          <Link href="/client" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#001341] to-[#5271ff] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <h1 className="font-black text-[#001341] text-lg leading-none">AICLEX</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Client Portal</p>
            </div>
          </Link>
          <button className="lg:hidden p-2 text-gray-400 hover:text-[#001341] rounded-xl hover:bg-gray-50" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
          <div className="mb-4 px-4">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Logged in as</p>
            <p className="font-bold text-[#001341] truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
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
            <h2 className="hidden lg:block text-lg font-black text-[#001341]">Welcome back, {user?.name.split(' ')[0]} 👋</h2>
          </div>
          
          {user?.role === 'admin' && (
             <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
               Admin Impersonation Mode
               <Link href="/dashboard/users" className="underline hover:text-yellow-900">Exit</Link>
             </div>
          )}
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
