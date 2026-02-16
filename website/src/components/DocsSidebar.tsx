"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsSections } from "@/lib/docs-data";
import { cn } from "@/lib/utils";

export default function DocsSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(docsSections.map((s) => [s.id, true]))
  );

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav className="space-y-1">
      {docsSections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => toggle(section.id)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            {section.title}
            <svg
              className={cn(
                "w-4 h-4 transition-transform",
                expanded[section.id] ? "rotate-90" : ""
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expanded[section.id] && (
            <div className="ml-3 border-l border-gray-200 dark:border-white/10 pl-3 space-y-0.5">
              {section.items.map((item) => {
                const href = `/docs/${section.id}/${item.id}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={cn(
                      "block px-3 py-1.5 text-sm rounded-lg transition-colors",
                      isActive
                        ? "text-brand-500 bg-brand-500/10 font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
