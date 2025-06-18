import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
      <DocsSidebar />
      <main>{children}</main>
    </div>
  );
}