import { redirect } from 'next/navigation';
import { DEFAULT_DOCS_VERSION } from "@/lib/docs-versions";

export default function DocsRootPage() {
  // Redirect the base /docs route to the first section
  redirect(`/docs/${DEFAULT_DOCS_VERSION}/introduction`);
}
