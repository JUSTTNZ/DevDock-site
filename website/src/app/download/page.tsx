"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DownloadButton from "@/components/DownloadButton";
import CodeBlock from "@/components/CodeBlock";
import { detectOS, osLabels, API_RELEASES_URL, RELEASES_URL, GITHUB_URL } from "@/lib/utils";

interface Asset {
  name: string;
  size: number;
  browser_download_url: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

const installInstructions = {
  windows: {
    title: "Windows Installation",
    steps: [
      "Download the .exe installer",
      "Run the installer and follow the setup wizard",
      "DevDock will be available in your Start menu",
    ],
  },
  macos: {
    title: "macOS Installation",
    steps: [
      "Download the .dmg file",
      "Open the .dmg and drag DevDock to your Applications folder",
      'Launch DevDock from Applications (you may need to right-click and select "Open" on first launch)',
    ],
  },
  linux: {
    title: "Linux Installation",
    steps: [
      "Download the .AppImage or .deb file",
      "For AppImage: chmod +x DevDock-*.AppImage && ./DevDock-*.AppImage",
      "For .deb: sudo dpkg -i devdock_*.deb",
    ],
  },
};

export default function DownloadPage() {
  const [os, setOs] = useState<"windows" | "macos" | "linux">("windows");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [version, setVersion] = useState("");

  useEffect(() => {
    setOs(detectOS());

    fetch(`${API_RELEASES_URL}/latest`)
      .then((res) => {
        if (!res.ok) throw new Error("No releases");
        return res.json();
      })
      .then((data) => {
        setAssets(data.assets || []);
        setVersion(data.tag_name || "");
      })
      .catch(() => {});
  }, []);

  const getAssetUrl = (ext: string) => {
    const asset = assets.find((a) => a.name.toLowerCase().endsWith(ext));
    return asset?.browser_download_url || RELEASES_URL;
  };

  const getAssetSize = (ext: string) => {
    const asset = assets.find((a) => a.name.toLowerCase().endsWith(ext));
    return asset ? formatBytes(asset.size) : "";
  };

  const instructions = installInstructions[os];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* OS Detection Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-medium mb-6">
          {version && <span>{version}</span>}
          {!version && <span>Latest Release</span>}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Download DevDock
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We detected you&apos;re on <span className="text-brand-500 font-semibold">{osLabels[os]}</span>
        </p>
      </motion.div>

      {/* Primary download */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <DownloadButton
          os={os}
          primary
          href={getAssetUrl(os === "windows" ? ".exe" : os === "macos" ? ".dmg" : ".appimage")}
          size={getAssetSize(os === "windows" ? ".exe" : os === "macos" ? ".dmg" : ".appimage")}
        />
      </motion.div>

      {/* All Downloads Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-16"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          All Downloads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DownloadButton
            os="windows"
            href={getAssetUrl(".exe")}
            size={getAssetSize(".exe")}
            primary={os === "windows"}
          />
          <DownloadButton
            os="macos"
            href={getAssetUrl(".dmg")}
            size={getAssetSize(".dmg")}
            primary={os === "macos"}
          />
          <DownloadButton
            os="linux"
            href={getAssetUrl(".appimage")}
            size={getAssetSize(".appimage")}
            primary={os === "linux"}
          />
        </div>

        {/* Additional Linux download */}
        {assets.some((a) => a.name.endsWith(".deb")) && (
          <div className="mt-4 text-center">
            <a
              href={getAssetUrl(".deb")}
              className="text-sm text-brand-500 hover:underline"
            >
              Also available as .deb for Debian/Ubuntu ({getAssetSize(".deb")})
            </a>
          </div>
        )}
      </motion.div>

      {/* Installation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-100 p-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {instructions.title}
        </h2>
        <ol className="space-y-3">
          {instructions.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 text-brand-500 text-sm font-medium flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Build from source */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-100 p-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Build from Source
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Requires Node.js v18+ and npm v9+.
        </p>
        <CodeBlock
          language="bash"
          code={`git clone ${GITHUB_URL}.git
cd DevDock
npm install
npm run dev`}
        />
      </motion.div>

      {/* System Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-100 p-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          System Requirements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Minimum</h3>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
              <li>Windows 10+, macOS 11+, or Ubuntu 20.04+</li>
              <li>4 GB RAM</li>
              <li>200 MB disk space</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommended</h3>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
              <li>8 GB RAM for monitoring many services</li>
              <li>SSD storage for faster startup</li>
              <li>Modern terminal emulator installed</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* SHA Checksums placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 p-8 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          SHA-256 checksums will be available with each release on the{" "}
          <a
            href={`${GITHUB_URL}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline"
          >
            GitHub releases page
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
