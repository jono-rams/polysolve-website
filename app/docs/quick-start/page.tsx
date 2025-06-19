import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";

export default function QuickStartPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
       <h1 className="text-4xl font-bold">Quick Start</h1>
      <Card>
        <CardHeader>
          <CardTitle>3. Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Here’s a simple example of creating a quadratic function and finding its roots:</p>
          <CodeBlock>
{`import polysolve

# Create an object representing a degree-2 polynomial (a quadratic)
# f(x) = 2x² - 3x - 5
f1 = polysolve.Function(2)

# Set the coefficients, from the largest exponent down to the constant
f1.set_coeffs([2, -3, -5])

print(f"Function: {f1}")
# Expected output: Function: 2x^2 - 3x - 5

# Find the approximate real roots (where f(x) = 0)
# This uses a genetic algorithm by default.
roots = f1.get_real_roots()

print(f"Approximate Roots: {roots}")
# Expected output may be something like: Approximate Roots: [-1.0001, 2.5003]`}
          </CodeBlock>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}