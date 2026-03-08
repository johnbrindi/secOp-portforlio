import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@/sanity/types";

export default function PortableTextContent({
  value,
  className = "",
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-3 leading-7 text-gray-300">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 text-2xl font-semibold text-cyan-300">{children}</h2>
            ),
          },
          marks: {
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline underline-offset-4"
              >
                {children}
              </a>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="mb-4 list-disc pl-6 text-gray-300">{children}</ul>,
          },
        }}
      />
    </div>
  );
}
