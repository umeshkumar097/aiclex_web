"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Ensure these match your actual file names
import Footer from "./Footer"; 

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Logic: If the URL starts with "/dashboard", hide the header/footer
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {/* 1. Only show Navbar on public pages */}
      {!isDashboard && <Navbar />}
      
      {/* 2. Main Content Area */}
      {/* We remove min-h-screen from dashboard because it handles its own height */}
      <main className={!isDashboard ? "min-h-screen" : ""}>
        {children}
      </main>

      {/* 3. Only show Footer on public pages */}
      {!isDashboard && <Footer />}
    </>
  );
}