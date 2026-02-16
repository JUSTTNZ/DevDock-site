"use client";

import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-brand-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-brand-500 prose-code:bg-brand-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-table:text-sm prose-th:text-left prose-th:px-4 prose-th:py-2 prose-th:bg-gray-100 dark:prose-th:bg-surface-200 prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-white/5 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            if (isInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={match[1]}
              />
            );
          },
          h2({ children }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return <h2 id={id}>{children}</h2>;
          },
          h3({ children }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return <h3 id={id}>{children}</h3>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
