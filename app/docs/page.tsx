import { redirect } from 'next/navigation';

export default function DocsRootPage() {
  // Redirect the base /docs route to the first section
  redirect('/docs/introduction');
}