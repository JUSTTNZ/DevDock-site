"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { API_RELEASES_URL, GITHUB_URL } from "@/lib/utils";

interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  assets: {
    id: number;
    name: string;
    size: number;
    browser_download_url: string;
    download_count: number;
  }[];
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_RELEASES_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setReleases(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Releases
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Download the latest version of DevDock or browse previous releases.
        </p>
      </motion.div>

      <div className="mt-12 space-y-8">
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/5 p-6 animate-pulse">
                <div className="h-6 w-40 bg-gray-200 dark:bg-surface-300 rounded mb-3" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-surface-300 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-surface-300 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-surface-300 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (error || releases.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-2xl border border-dashed border-gray-300 dark:border-white/10"
          >
            <div className="text-5xl mb-4">&#128230;</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {error ? "Unable to load releases" : "Coming Soon"}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {error
                ? "We couldn't fetch releases from GitHub. Please try again later."
                : "No releases have been published yet. Check back soon or star the repo to get notified."}
            </p>
            <a
              href={`${GITHUB_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
            >
              View on GitHub
            </a>
          </motion.div>
        )}

        {!loading &&
          !error &&
          releases.map((release, i) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {release.name || release.tag_name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-500 border border-brand-500/20">
                    {release.tag_name}
                  </span>
                  {release.prerelease && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                      Pre-release
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Released {formatDate(release.published_at)}
                </p>

                {release.body && (
                  <div className="mt-4 prose prose-sm prose-gray dark:prose-invert max-w-none prose-a:text-brand-500 prose-code:text-brand-500">
                    <ReactMarkdown>{release.body}</ReactMarkdown>
                  </div>
                )}

                {release.assets.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Downloads</p>
                    <div className="grid gap-2">
                      {release.assets.map((asset) => (
                        <a
                          key={asset.id}
                          href={asset.browser_download_url}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-surface-200 hover:bg-gray-100 dark:hover:bg-surface-300 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {asset.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            {asset.download_count > 0 && (
                              <span>{asset.download_count.toLocaleString()} downloads</span>
                            )}
                            <span>{formatBytes(asset.size)}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
