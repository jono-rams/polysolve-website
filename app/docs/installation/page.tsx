import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";

export default function InstallationPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Installation</h1>
      <Card>
        <CardHeader>
          <CardTitle>2. Installation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Standard Installation</h3>
          <p>You can install the standard version of PolySolve from PyPI using pip:</p>
          <CodeBlock>pip install polysolve</CodeBlock>
          
          <h3 className="font-semibold">CUDA Accelerated Installation</h3>
          <p>To enable GPU acceleration, you need a compatible NVIDIA GPU with the CUDA toolkit installed, as well as the <code>cupy</code> library. You can install PolySolve with the CUDA extras, which will automatically handle the <code>cupy</code> dependency:</p>
          <CodeBlock>pip install &quot;polysolve[cuda12]&quot;</CodeBlock>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}