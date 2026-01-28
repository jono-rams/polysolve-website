import { redirect } from "next/navigation";
import { DEFAULT_DOCS_VERSION } from "@/lib/docs-versions";

export default function LegacyDocsRedirect() {
  redirect("/docs/" + DEFAULT_DOCS_VERSION + "/ga-options-api");
}
