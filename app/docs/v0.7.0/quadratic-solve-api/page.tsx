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
          <p>
            For the special case of degree-2 polynomials (quadratics), the{" "}
            <code>Function</code> class provides a direct, analytical solver
            method using the quadratic formula. This is much faster and more
            precise than the genetic algorithm for this specific case.
          </p>
          <CodeBlock language="python">
            {`from polysolve import Function

# Case 1: Real Roots
# f(x) = x² - x - 6
f_quad = Function(2)
f_quad.set_coeffs([1, -1, -6])
print(f_quad.quadratic_solve()) # Output: [-2.0, 3.0]

# Case 2: Complex Roots
# f(x) = x² + 1 (roots are +j and -j)
f_complex = Function(2)
f_complex.set_coeffs([1, 0, 1])
print(f_complex.quadratic_solve()) # Output: [(-0-1j), 1j]`}
          </CodeBlock>
          The method returns a sorted list containing two numbers (floats or complex).
          If the quadratic has no real roots, it will return **complex roots** (e.g., `(-1+2j)`).
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}

