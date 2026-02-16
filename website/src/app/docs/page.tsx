"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/docs/getting-started/installation");
  }, [router]);

  return (
    <div className="py-20 text-center col-span-2">
      <div className="animate-pulse text-gray-400">Loading documentation...</div>
    </div>
  );
}
