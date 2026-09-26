import { redirect } from "next/navigation";

export default function DocsVersionRootPage() {
  redirect("/docs/v0.8.0/introduction");
}

