import { redirect } from "next/navigation";

export default function DocsVersionRootPage() {
  redirect("/docs/v0.6.3/introduction");
}

