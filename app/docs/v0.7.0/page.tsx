import { redirect } from "next/navigation";

export default function DocsVersionRootPage() {
  redirect("/docs/v0.7.0/introduction");
}

