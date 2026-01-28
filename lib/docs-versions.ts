export const DOC_VERSIONS = [
  "v0.6.0",
  "v0.6.1",
  "v0.6.2",
  "v0.6.3",
] as const;

export type DocsVersion = (typeof DOC_VERSIONS)[number];

export const DEFAULT_DOCS_VERSION: DocsVersion = "v0.6.3";

export function isDocsVersion(value: string): value is DocsVersion {
  return (DOC_VERSIONS as readonly string[]).includes(value);
}

export type ParsedDocsPath = {
  version: DocsVersion;
  slug?: string;
};

export function parseDocsPathname(pathname?: string | null): ParsedDocsPath {
  if (!pathname) return { version: DEFAULT_DOCS_VERSION };
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "docs") return { version: DEFAULT_DOCS_VERSION };

  const maybeVersion = segments[1];
  if (maybeVersion && isDocsVersion(maybeVersion)) {
    return { version: maybeVersion, slug: segments[2] };
  }

  // Legacy routes like `/docs/introduction`
  return { version: DEFAULT_DOCS_VERSION, slug: segments[1] };
}

export function buildDocsHref(version: DocsVersion, slug?: string): string {
  if (!slug) return `/docs/${version}`;
  return `/docs/${version}/${slug}`;
}
