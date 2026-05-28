"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Script from "next/script";

function CheckoutPayContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const envParam = searchParams.get("env") || "production";
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isCashfreeLoaded, setIsCashfreeLoaded] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment link. No session ID found.");
      return;
    }

    if (isCashfreeLoaded && (window as any).Cashfree) {
      try {
        const cashfree = (window as any).Cashfree({
          mode: envParam === "sandbox" ? "sandbox" : "production",
        });

        cashfree.checkout({
          paymentSessionId: sessionId,
          redirectTarget: "_self"
        }).then((result: any) => {
          if (result.error) {
            setError(result.error.message || "Payment initialization failed.");
          }
        });
      } catch (err: any) {
        console.error("Cashfree init error:", err);
        setError("Failed to load payment gateway.");
      }
    }
  }, [sessionId, isCashfreeLoaded, envParam]);

  return (
    <>
      <Script 
        src="https://sdk.cashfree.com/js/v3/cashfree.js" 
        onLoad={() => setIsCashfreeLoaded(true)}
      />
      
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
        {error ? (
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Payment Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => router.push('/pricing')}
              className="bg-[#001341] text-white px-6 py-2 rounded-lg font-bold"
            >
              Back to Services
            </button>
          </div>
        ) : (
          <div>
            <Loader2 className="w-12 h-12 text-[#5271ff] animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#001341] mb-2">Secure Checkout</h2>
            <p className="text-gray-500 text-sm">
              Redirecting you to Cashfree secure payment gateway...
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function CheckoutPayPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<Loader2 className="w-12 h-12 text-[#5271ff] animate-spin" />}>
        <CheckoutPayContent />
      </Suspense>
    </div>
  );
}
