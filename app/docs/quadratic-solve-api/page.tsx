import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-secondary p-4 rounded-md overflow-x-auto"><code className="font-mono text-sm">{children}</code></pre>
);

export default function QuadraticSolvePage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">quadratic_solve() API</h1>
      <Card>
        <CardHeader>
          <CardTitle>6. API Reference: `quadratic_solve()`</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>For the special case of degree-2 polynomials (quadratics), PolySolve provides a direct, analytical solver using the quadratic formula. This is much faster and more precise than the genetic algorithm for this specific case.</p>
          <CodeBlock>
{`from polysolve import Function, quadratic_solve

# f(x) = x² - x - 6
f_quad = Function(2)
f_quad.set_coeffs([1, -1, -6])

# Use the analytical solver
exact_roots = quadratic_solve(f_quad)
print(exact_roots) # Output: [3.0, -2.0]`}
          </CodeBlock>
          <p>The function returns a list containing two floats. If the quadratic has no real roots (i.e., the discriminant is negative), it will return <code>None</code>.</p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}