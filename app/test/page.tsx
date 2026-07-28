"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function TestRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/checkout?plan=test-monthly");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfc]">
      <Loader2 className="animate-spin text-[#ff6600] mb-4" size={40} />
      <p className="text-[#001341] font-bold">Redirecting to ₹50 Test Checkout (PayU)...</p>
    </div>
  );
}
