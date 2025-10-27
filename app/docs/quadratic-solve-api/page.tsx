import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";

export default function QuadraticSolvePage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Function.quadratic_solve()</h1>
      <Card>
        <CardHeader>
          <CardTitle>6. API Reference: `Function.quadratic_solve()` Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>For the special case of degree-2 polynomials (quadratics), the <code>Function</code> class provides a direct, analytical solver method using the quadratic formula. This is much faster and more precise than the genetic algorithm for this specific case.</p>
          <CodeBlock language="python">
{`from polysolve import Function

# f(x) = x² - x - 6
f_quad = Function(2)
f_quad.set_coeffs([1, -1, -6])

# Call the analytical solver method
exact_roots = f_quad.quadratic_solve()
print(exact_roots) # Output: [-2.0, 3.0]`}
          </CodeBlock>
          <p>The method returns a sorted list containing two floats. If the quadratic has no real roots (i.e., the discriminant is negative), it will return <code>None</code>.</p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}