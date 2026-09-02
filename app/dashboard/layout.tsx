"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Settings, LogOut, Briefcase, Users, Image as ImageIcon,
  MessageSquare, BarChart3, Globe, Bell, Menu, X, FileText, CalendarDays,
  Target, Mail, HelpCircle, PhoneCall, ShieldCheck, Search, ChevronDown, 
  ChevronRight, Star, Plus, Brain, Sparkles, Zap, DollarSign, FolderGit,
  Terminal, ShieldAlert, CheckCircle, Volume2, User, Key, KeyRound, Building,
  Layers, Database, Calendar, Award
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavSubItem {
  name: string;
  href: string;
  icon: any;
  ai?: boolean;
}

interface NavSection {
  title: string;
  id: string;
  icon: any;
  items: NavSubItem[];
}

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
  const [userName, setUserName] = useState("Umesh Kumar");
  const [userEmail, setUserEmail] = useState("admin@aiclex.in");

  // Custom States
  const [workspace, setWorkspace] = useState("Aiclex Solutions Pvt. Ltd");
  const [showWorkspaceSelector, setShowWorkspaceSelector] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    crm: false,
    ai: false,
    comm: true,
    projects: true,
    sales: true,
    marketing: true,
    automation: true,
    admin_sec: true,
    hr_sec: false,
    content_sec: false
  });

  // Favorites & Recents
  const [favorites, setFavorites] = useState<string[]>(["CRM / Leads", "AI Calling", "Email Logs"]);
  const [recents, setRecents] = useState<Array<{ name: string; href: string }>>([
    { name: "Overview", href: "/dashboard" },
    { name: "CRM / Leads", href: "/dashboard/crm" }
  ]);

  // Command Palette State
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [cmdSearch, setCmdSearch] = useState("");
  const [cmdActiveIndex, setCmdActiveIndex] = useState(0);
  const cmdInputRef = useRef<HTMLInputElement>(null);

  // Quick Action Switcher
  const [showQuickCreate, setShowQuickCreate] = useState(false);

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
            setUserName(userInfo.name || "Umesh Kumar");
            setUserEmail(userInfo.email || "admin@aiclex.in");
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

  // Key Bindings for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCmdPalette((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowCmdPalette(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showCmdPalette) {
      setTimeout(() => cmdInputRef.current?.focus(), 50);
      setCmdSearch("");
      setCmdActiveIndex(0);
    }
  }, [showCmdPalette]);

  // Track Recent Items on Path Change
  useEffect(() => {
    const currentItem = allSearchableItems.find(item => item.href === pathname);
    if (currentItem && currentItem.name !== "Overview") {
      setRecents((prev) => {
        const filtered = prev.filter(p => p.href !== pathname);
        return [{ name: currentItem.name, href: currentItem.href }, ...filtered].slice(0, 3);
      });
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_info");
    router.push("/signin");
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleFavorite = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const sections: NavSection[] = [
    {
      title: "CRM",
      id: "crm",
      icon: Target,
      items: [
        { name: "CRM / Leads", href: "/dashboard/crm", icon: Users },
        { name: "Contacts", href: "/dashboard/crm?tab=contacts", icon: User },
        { name: "Companies", href: "/dashboard/crm?tab=companies", icon: Building },
        { name: "Deals", href: "/dashboard/crm?tab=deals", icon: DollarSign },
        { name: "Pipeline", href: "/dashboard/crm?tab=pipeline", icon: Layers },
        { name: "Activities", href: "/dashboard/crm?tab=activities", icon: BarChart3 },
        { name: "Tasks", href: "/dashboard/crm?tab=tasks", icon: FileText },
        { name: "Calendar", href: "/dashboard/meetings", icon: Calendar }
      ]
    },
    {
      title: "AI Engine",
      id: "ai",
      icon: Brain,
      items: [
        { name: "AI Calling", href: "/dashboard/ai?tab=calling", icon: PhoneCall, ai: true },
        { name: "AI Chat", href: "/dashboard/ai?tab=chat", icon: MessageSquare, ai: true },
        { name: "AI Lead Score", href: "/dashboard/ai?tab=lead-score", icon: Target, ai: true },
        { name: "AI Follow-up", href: "/dashboard/ai?tab=follow-up", icon: Sparkles, ai: true },
        { name: "AI Email", href: "/dashboard/ai?tab=email", icon: Mail, ai: true },
        { name: "AI Analytics", href: "/dashboard/ai?tab=analytics", icon: BarChart3, ai: true }
      ]
    },
    {
      title: "Communication",
      id: "comm",
      icon: MessageSquare,
      items: [
        { name: "WhatsApp", href: "/dashboard/comm?tab=whatsapp", icon: MessageSquare },
        { name: "Email Logs", href: "/dashboard/email_logs", icon: Mail },
        { name: "SMS Logs", href: "/dashboard/comm?tab=sms", icon: MessageSquare },
        { name: "Calls Logs", href: "/dashboard/comm?tab=calls", icon: PhoneCall },
        { name: "Meetings", href: "/dashboard/meetings", icon: CalendarDays }
      ]
    },
    {
      title: "Projects",
      id: "projects",
      icon: FolderGit,
      items: [
        { name: "Projects", href: "/dashboard/services", icon: Briefcase },
        { name: "Clients", href: "/dashboard/users", icon: Users },
        { name: "Files", href: "/dashboard/projects?tab=files", icon: ImageIcon },
        { name: "Contracts", href: "/dashboard/projects?tab=contracts", icon: FileText }
      ]
    },
    {
      title: "Sales",
      id: "sales",
      icon: DollarSign,
      items: [
        { name: "Quotations", href: "/dashboard/sales?tab=quotations", icon: FileText },
        { name: "Payments", href: "/dashboard/subscriptions", icon: DollarSign },
        { name: "Revenue", href: "/dashboard/subscriptions", icon: BarChart3 },
        { name: "Reports", href: "/dashboard/logs", icon: BarChart3 }
      ]
    },
    {
      title: "Marketing",
      id: "marketing",
      icon: Globe,
      items: [
        { name: "Coach Discovery (COB)", href: "/dashboard/cob", icon: FileText },
        { name: "Campaigns", href: "/dashboard/marketing?tab=campaigns", icon: Target },
        { name: "Landing Pages", href: "/", icon: Globe },
        { name: "Forms", href: "/dashboard/enquiries", icon: FileText },
        { name: "Website Leads", href: "/dashboard/enquiries", icon: Users },
        { name: "Blog Leads", href: "/dashboard/newsletters", icon: Mail }
      ]
    },
    {
      title: "Automation",
      id: "automation",
      icon: Zap,
      items: [
        { name: "Workflows", href: "/dashboard/automation?tab=workflows", icon: Zap },
        { name: "Webhooks", href: "/dashboard/webhook_logs", icon: Globe },
        { name: "Integrations", href: "/dashboard/links", icon: Globe }
      ]
    },
    {
      title: "Administration",
      id: "admin_sec",
      icon: Settings,
      items: [
        { name: "Users", href: "/dashboard/users", icon: Users },
        { name: "Roles", href: "/dashboard/access-control", icon: ShieldCheck },
        { name: "Permissions", href: "/dashboard/access-control", icon: ShieldCheck },
        { name: "Audit Logs", href: "/dashboard/logs", icon: BarChart3 },
        { name: "Billing", href: "/dashboard/subscriptions", icon: DollarSign },
        { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Target },
        { name: "Settings", href: "/dashboard/settings", icon: Settings }
      ]
    }
  ];

  const getFilteredSections = () => {
    const list = [
      ...sections,
      {
        title: "HR & Careers",
        id: "hr_sec",
        icon: Briefcase,
        items: [
          { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
          { name: "Applications", href: "/dashboard/applications", icon: Users }
        ]
      },
      {
        title: "Content & Brand",
        id: "content_sec",
        icon: ImageIcon,
        items: [
          { name: "Services", href: "/dashboard/services", icon: Target },
          { name: "Blog Posts", href: "/dashboard/blogs", icon: FileText },
          { name: "Portfolio", href: "/dashboard/portfolio", icon: ImageIcon },
          { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare }
        ]
      }
    ];

    if (userRole === "admin") return list;

    if (userRole === "hr") {
      return list.filter(s => s.id === "hr_sec");
    }

    if (userRole === "sales") {
      return list.filter(s => ["crm", "comm", "marketing"].includes(s.id)).map(s => {
        if (s.id === "marketing") {
          return {
            ...s,
            items: s.items.filter(item => ["Forms", "Website Leads"].includes(item.name))
          };
        }
        return s;
      });
    }

    if (userRole === "editor") {
      return list.filter(s => s.id === "content_sec");
    }

    return [];
  };

  const filteredSections = getFilteredSections();

  const allSearchableItems = [
    { name: "Overview / Dashboard", href: "/dashboard", section: "Dashboard", icon: LayoutDashboard },
    ...filteredSections.flatMap(s => s.items.map(item => ({
      name: item.name,
      href: item.href,
      section: s.title,
      icon: item.icon
    })))
  ];

  // Filtering for Command Palette search
  const cmdFilteredItems = allSearchableItems.filter((item) =>
    item.name.toLowerCase().includes(cmdSearch.toLowerCase()) ||
    item.section.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  const handleCmdKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCmdActiveIndex((prev) => (prev + 1) % cmdFilteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCmdActiveIndex((prev) => (prev - 1 + cmdFilteredItems.length) % cmdFilteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (cmdFilteredItems[cmdActiveIndex]) {
        router.push(cmdFilteredItems[cmdActiveIndex].href);
        setShowCmdPalette(false);
      }
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#001341]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* PREMIUM DARK-GLASS SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#0a0f1d] text-gray-300 border-r border-[#1a233b]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-screen overflow-hidden
      `}>
        
        {/* WORKSPACE SWITCHER */}
        <div className="p-4 border-b border-[#131b32] shrink-0 relative">
          <button 
            onClick={() => setShowWorkspaceSelector(!showWorkspaceSelector)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#131a31] hover:bg-[#1a2444] border border-[#222f56]/50 transition duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="text-white font-black text-base">A</span>
              </div>
              <div className="min-w-0">
                <h1 className="font-black text-white text-sm leading-tight truncate">{workspace}</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider truncate">
                    {userRole === "admin" ? "Founder Workspace" : `${userRole.toUpperCase()} Account`}
                  </p>
                </div>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-400 group-hover:text-white shrink-0 transition" />
          </button>

          {/* Workspace Dropdown */}
          <AnimatePresence>
            {showWorkspaceSelector && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowWorkspaceSelector(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-4 right-4 mt-2 bg-[#12192f] border border-[#202c4f] rounded-2xl p-2.5 shadow-2xl z-20 space-y-1"
                >
                  <button 
                    onClick={() => {
                      setWorkspace("Aiclex Solutions Pvt. Ltd");
                      setShowWorkspaceSelector(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#1b2545] transition text-left text-xs font-bold text-white"
                  >
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px]">A</div>
                    Aiclex Solutions Pvt. Ltd
                  </button>
                  <button 
                    onClick={() => {
                      setWorkspace("Aiclex Technologies");
                      setShowWorkspaceSelector(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#1b2545] transition text-left text-xs font-bold text-gray-400 hover:text-white"
                  >
                    <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-[10px]">T</div>
                    Aiclex Technologies
                  </button>
                  <button 
                    onClick={() => {
                      setWorkspace("Sandbox Dev");
                      setShowWorkspaceSelector(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#1b2545] transition text-left text-xs font-bold text-gray-400 hover:text-white"
                  >
                    <div className="w-5 h-5 rounded bg-amber-600 flex items-center justify-center text-[10px]">D</div>
                    Sandbox Dev (Testing)
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* SEARCH BAR (Ctrl + K TRIGGER) */}
        <div className="px-4 py-2 shrink-0">
          <button 
            onClick={() => setShowCmdPalette(true)}
            className="w-full flex items-center justify-between px-3 py-2 bg-[#0e1428] hover:bg-[#121a33] border border-[#1b2545] rounded-xl text-left transition text-xs text-gray-400 font-bold group"
          >
            <div className="flex items-center gap-2.5">
              <Search size={14} className="text-gray-500 group-hover:text-blue-400 transition" />
              <span>Search modules...</span>
            </div>
            <kbd className="px-1.5 py-0.5 bg-[#17213e] text-[9px] font-bold text-gray-400 border border-[#273663] rounded uppercase">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* MAIN NAVIGATION SCROLL AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-hide">
          
          {/* STATIC DASHBOARD / OVERVIEW LINK */}
          <div>
            <Link
              href="/dashboard"
              className={`
                relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-black text-xs transition duration-200 group
                ${pathname === "/dashboard" 
                  ? "bg-[#111933] text-white border-l-2 border-blue-500 pl-2.5" 
                  : "text-gray-400 hover:bg-[#0e1428] hover:text-white"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={16} className={pathname === "/dashboard" ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"} />
                <span>Overview Dashboard</span>
              </div>
            </Link>
          </div>

          {/* QUICK CREATE BUTTON */}
          <div className="relative">
            <button 
              onClick={() => setShowQuickCreate(!showQuickCreate)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/10 transition cursor-pointer"
            >
              <Plus size={14} /> Quick Create Action
            </button>

            <AnimatePresence>
              {showQuickCreate && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowQuickCreate(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-[#12192f] border border-[#202c4f] rounded-2xl p-2 shadow-2xl z-20 text-xs font-bold"
                  >
                    <Link 
                      href="/dashboard/crm?action=add-lead" 
                      onClick={() => setShowQuickCreate(false)}
                      className="flex items-center gap-2 p-2 hover:bg-[#1b2545] rounded-lg text-gray-300 hover:text-white"
                    >
                      <Users size={14} className="text-blue-400" /> Create CRM Lead
                    </Link>
                    <Link 
                      href="/dashboard/access-control" 
                      onClick={() => setShowQuickCreate(false)}
                      className="flex items-center gap-2 p-2 hover:bg-[#1b2545] rounded-lg text-gray-300 hover:text-white"
                    >
                      <Plus size={14} className="text-purple-400" /> Invite New Member
                    </Link>
                    <Link 
                      href="/dashboard/meetings" 
                      onClick={() => setShowQuickCreate(false)}
                      className="flex items-center gap-2 p-2 hover:bg-[#1b2545] rounded-lg text-gray-300 hover:text-white"
                    >
                      <CalendarDays size={14} className="text-emerald-400" /> Book Team Meeting
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* FAVORITES */}
          {favorites.length > 0 && (
            <div className="space-y-1">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2 flex items-center gap-1.5">
                <Star size={10} className="text-amber-500 fill-amber-500" /> Favorites
              </span>
              <div className="space-y-0.5">
                {allSearchableItems.filter(item => favorites.includes(item.name)).map(item => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:bg-[#0e1428] hover:text-white transition group"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon size={13} className="text-gray-500 group-hover:text-blue-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(e, item.name)} 
                      className="opacity-0 group-hover:opacity-100 transition p-1 text-gray-500 hover:text-amber-500"
                    >
                      <Star size={12} className="fill-amber-500 text-amber-500" />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* COLLAPSIBLE MODULE SECTIONS */}
          <div className="space-y-2">
            {filteredSections.map((section) => {
              const isCollapsed = collapsedSections[section.id];
              const SectionIcon = section.icon;

              return (
                <div key={section.id} className="space-y-1">
                  {/* Section Title Tab */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-gray-500 hover:text-white transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <SectionIcon size={14} className="text-gray-600 group-hover:text-blue-400 transition" />
                      <span className="text-[10px] font-black uppercase tracking-wider">{section.title}</span>
                    </div>
                    {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                  </button>

                  {/* Section Child Sub-items */}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-0.5 pl-3 border-l border-[#131b32] ml-3"
                      >
                        {section.items.map((item) => {
                          const isActive = pathname === item.href;
                          const ItemIcon = item.icon;
                          const isStarred = favorites.includes(item.name);

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`
                                relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition duration-200 group
                                ${isActive 
                                  ? "bg-[#111933] text-white border-l-2 border-blue-500 pl-2" 
                                  : "text-gray-400 hover:bg-[#0e1428] hover:text-white"
                                }
                              `}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <ItemIcon size={14} className={isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"} />
                                <span className="truncate">{item.name}</span>
                                {item.ai && (
                                  <span className="shrink-0 px-1 py-0.5 text-[8px] font-black rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.3)] animate-pulse">
                                    AI
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={(e) => toggleFavorite(e, item.name)}
                                className={`
                                  opacity-0 group-hover:opacity-100 transition p-1 hover:scale-110
                                  ${isStarred ? "opacity-100 text-amber-500" : "text-gray-500 hover:text-amber-500"}
                                `}
                              >
                                <Star size={12} className={isStarred ? "fill-amber-500 text-amber-500" : ""} />
                              </button>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RECENTS */}
          {recents.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-[#131b32]">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">
                Recent Sections
              </span>
              <div className="space-y-0.5">
                {recents.map(item => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className="w-full block px-3 py-1 rounded-lg text-[11px] font-medium text-gray-500 hover:bg-[#0e1428] hover:text-white transition truncate"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM USER PROFILE CARD */}
        <div className="p-4 border-t border-[#131b32] shrink-0 bg-[#080d19] relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#121a31] transition text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-black text-sm border border-blue-400/20">
                {userName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate leading-none">{userName}</p>
                <p className="text-[10px] text-gray-500 truncate mt-1">{userEmail}</p>
              </div>
            </div>
            <Settings size={14} className="text-gray-500 group-hover:text-white transition shrink-0" />
          </button>

          {/* Profile Quick Popover menu */}
          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-15" onClick={() => setProfileOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute bottom-16 left-4 right-4 bg-[#12192f] border border-[#202c4f] rounded-2xl p-2 shadow-2xl z-20 space-y-1"
                >
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 p-2 hover:bg-[#1b2545] rounded-xl text-xs font-bold text-gray-300 hover:text-white"
                  >
                    <Settings size={14} /> Workspace Settings
                  </Link>
                  <button 
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-red-950/30 text-red-400 hover:text-red-300 rounded-xl text-xs font-bold text-left cursor-pointer"
                  >
                    <LogOut size={14} /> Log Out Securely
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
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
            <h2 className="hidden lg:block text-lg font-black text-[#001341]">Welcome back, {userName} 👋</h2>
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

            {/* PROFILE ICON */}
            <button 
              onClick={() => router.push("/dashboard/settings")}
              className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#5271ff] font-black border border-blue-100 transition-transform hover:scale-105"
            >
              {userName.charAt(0)}
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10 relative">
          {children}
        </main>
      </div>

      {/* COMMAND PALETTE DIALOG */}
      <AnimatePresence>
        {showCmdPalette && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-[#030712]/50 backdrop-blur-sm z-[70] transition-opacity"
              onClick={() => setShowCmdPalette(false)}
            />

            {/* Dialog Container */}
            <div className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-lg bg-[#0e1425] border border-[#212d4d] rounded-2xl shadow-2xl shadow-[#02050e]/80 overflow-hidden pointer-events-auto flex flex-col max-h-[50vh]"
              >
                {/* Search input header */}
                <div className="p-4 border-b border-[#1b2543] flex items-center gap-3">
                  <Search size={18} className="text-gray-400 shrink-0" />
                  <input
                    ref={cmdInputRef}
                    type="text"
                    placeholder="Type a module name or action to jump to..."
                    value={cmdSearch}
                    onChange={(e) => {
                      setCmdSearch(e.target.value);
                      setCmdActiveIndex(0);
                    }}
                    onKeyDown={handleCmdKeyDown}
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button 
                    onClick={() => setShowCmdPalette(false)}
                    className="p-1 hover:bg-[#1a233b] rounded text-gray-500 hover:text-white transition"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Results list */}
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                  {cmdFilteredItems.map((item, idx) => {
                    const isActive = idx === cmdActiveIndex;
                    const ItemIcon = item.icon;

                    return (
                      <button
                        key={item.name + idx}
                        onClick={() => {
                          router.push(item.href);
                          setShowCmdPalette(false);
                        }}
                        onMouseEnter={() => setCmdActiveIndex(idx)}
                        className={`
                          w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer
                          ${isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-[#172037] hover:text-white"}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <ItemIcon size={16} className={isActive ? "text-white" : "text-gray-500"} />
                          <div className="text-xs font-bold">
                            <div>{item.name}</div>
                            <div className={`text-[9px] mt-0.5 ${isActive ? "text-blue-200" : "text-gray-500"}`}>
                              {item.section}
                            </div>
                          </div>
                        </div>
                        {isActive && <span className="text-[10px] uppercase font-black tracking-wider text-blue-100">Jump ↩</span>}
                      </button>
                    );
                  })}
                  {cmdFilteredItems.length === 0 && (
                    <div className="py-8 text-center text-gray-500 text-xs font-bold">
                      No modules found matching "{cmdSearch}"
                    </div>
                  )}
                </div>

                {/* Footer hints */}
                <div className="px-4 py-2.5 border-t border-[#1b2543] bg-[#090e1b] flex items-center justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest shrink-0">
                  <div className="flex gap-3">
                    <span>↑↓ to navigate</span>
                    <span>↵ to select</span>
                  </div>
                  <span>esc to close</span>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
