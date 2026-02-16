import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevDock - Your Dev Services, One Dashboard",
    template: "%s | DevDock",
  },
  description:
    "Open-source Electron app for managing, monitoring, and orchestrating local dev services. Real-time CPU & memory monitoring, auto-restart, port conflict resolution, and more.",
  keywords: [
    "DevDock",
    "developer tools",
    "service manager",
    "Electron",
    "local development",
    "process monitor",
    "dev services",
  ],
  authors: [{ name: "JUSTTNZ", url: "https://github.com/JUSTTNZ" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devdock.dev",
    title: "DevDock - Your Dev Services, One Dashboard",
    description:
      "Open-source Electron app for managing, monitoring, and orchestrating local dev services.",
    siteName: "DevDock",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDock - Your Dev Services, One Dashboard",
    description:
      "Open-source Electron app for managing, monitoring, and orchestrating local dev services.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-surface-0 text-gray-900 dark:text-gray-100 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
