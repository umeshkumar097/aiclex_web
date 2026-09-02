"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CobAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/cob");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b16] text-white">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
      <p className="font-bold text-sm text-gray-300">Redirecting to Aiclex COB Admin Dashboard...</p>
    </div>
  );
}
