"use client";

import { useState } from "react";
import DocsSidebar from "@/components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[260px_1fr_200px] lg:gap-8">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-surface-200 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Documentation Menu
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block py-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto`}
        >
          <DocsSidebar />
        </aside>

        {/* Main content area + TOC rendered by child */}
        {children}
      </div>
    </div>
  );
}
