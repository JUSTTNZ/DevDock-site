"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { docsSections, getAllDocItems } from "@/lib/docs-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TOC from "@/components/TOC";

export default function DocPage() {
  const params = useParams();
  const sectionId = params.section as string;
  const slug = params.slug as string;

  const section = docsSections.find((s) => s.id === sectionId);
  const item = section?.items.find((i) => i.id === slug);

  if (!section || !item) {
    return (
      <div className="py-20 text-center col-span-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-gray-500">The documentation page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/docs" className="mt-4 inline-block text-brand-500 hover:underline">
          Back to docs
        </Link>
      </div>
    );
  }

  // Find prev/next
  const allItems = getAllDocItems();
  const currentIndex = allItems.findIndex(
    (i) => i.section.id === sectionId && i.item.id === slug
  );
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <>
      {/* Main content */}
      <article className="py-8 min-w-0">
        <div className="mb-8">
          <p className="text-sm text-brand-500 font-medium mb-1">{section.title}</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h1>
        </div>

        <MarkdownRenderer content={item.content} />

        {/* Edit on GitHub */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/5">
          <a
            href={`https://github.com/JUSTTNZ/DevDock/edit/main/website/src/lib/docs-data.ts`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors"
          >
            Edit this page on GitHub &rarr;
          </a>
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/docs/${prev.section.id}/${prev.item.id}`}
              className="group p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-brand-500/30 transition-colors"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">&larr; Previous</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">
                {prev.item.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/docs/${next.section.id}/${next.item.id}`}
              className="group p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-brand-500/30 transition-colors text-right"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next &rarr;</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">
                {next.item.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* Table of Contents */}
      <aside className="hidden lg:block py-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <TOC content={item.content} />
      </aside>
    </>
  );
}
