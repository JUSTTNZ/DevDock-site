import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Download", href: "/download" },
      { label: "Releases", href: "/releases" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/JUSTTNZ/DevDock", external: true },
      { label: "Issues", href: "https://github.com/JUSTTNZ/DevDock/issues", external: true },
      { label: "Discussions", href: "https://github.com/JUSTTNZ/DevDock/discussions", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "License (ISC)", href: "https://github.com/JUSTTNZ/DevDock/blob/main/LICENSE", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">&#9889;</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">DevDock</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Open-source desktop app for managing local dev services.
            </p>
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Built by{" "}
              <a
                href="mailto:codebynz01@gmail.com"
                className="text-brand-500 hover:text-brand-400 transition-colors"
              >
                JUSTTNZ
              </a>
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} DevDock. Released under the ISC License.
          </p>
        </div>
      </div>
    </footer>
  );
}
