export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function detectOS(): "windows" | "macos" | "linux" {
  if (typeof window === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "windows";
}

export const osLabels: Record<string, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

export const osExtensions: Record<string, string> = {
  windows: ".exe",
  macos: ".dmg",
  linux: ".AppImage",
};

export const GITHUB_REPO = "JUSTTNZ/DevDock";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
export const RELEASES_URL = `${GITHUB_URL}/releases/latest`;
export const API_RELEASES_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases`;
