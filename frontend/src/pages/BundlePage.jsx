import UpsellCard from "../components/UpsellCard";

import { Sparkles } from "lucide-react";

export default function BundlePage() {
  return (
    
      <div className="space-y-8">

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-[#5B3FD8]" size={28} />
            <h1 className="text-4xl font-bold">
              AI Bundle Studio
            </h1>
          </div>

          <p className="text-gray-600 text-lg max-w-3xl">
            Generate intelligent upsell and cross-sell bundles using AI,
            preview pricing, and launch a real Razorpay checkout.
          </p>
        </div>

        <UpsellCard />

      </div>
    
  );
}