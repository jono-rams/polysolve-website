import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-secondary p-4 rounded-md overflow-x-auto"><code className="font-mono text-sm">{children}</code></pre>
);

export default function FunctionApiPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Function Class API</h1>
      <Card>
        <CardHeader>
          <CardTitle>4. API Reference: The `Function` Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="font-semibold">Initialization</h3>
            <p>A <code>Function</code> is initialized with its highest degree.</p>
            <CodeBlock>{`# Creates a placeholder for a cubic function (degree 3)\nmy_func = polysolve.Function(3)`}</CodeBlock>
            <p>The function is not usable until its coefficients are set.</p>
            <CodeBlock>{`# f(x) = 4x³ - 2x² + 0x - 9\n# Note: The list must contain degree + 1 elements.\nmy_func.set_coeffs([4, -2, 0, -9])`}</CodeBlock>
          </section>
          <section>
            <h3 className="font-semibold">Properties</h3>
            <p>You can access the degree of the function.</p>
            <CodeBlock>{`my_func.degree  # Returns 3\nmy_func.largest_exponent # Also returns 3`}</CodeBlock>
          </section>
          <section>
            <h3 className="font-semibold">Evaluation</h3>
            <p>Evaluate the function at a specific x-value.</p>
            <CodeBlock>{`# Calculate f(2) for f(x) = 2x² - 3x - 5\nf1 = polysolve.Function(2)\nf1.set_coeffs([2, -3, -5])\ny = f1.solve_y(2)\nprint(y) # Output: -3.0`}</CodeBlock>
          </section>
          <section>
            <h3 className="font-semibold">Calculus</h3>
            <p>Calculate the first derivative or the nth-order derivative.</p>
            <CodeBlock>{`# f(x) = x³ + 2x² + 5\nf_cubic = polysolve.Function(3)\nf_cubic.set_coeffs([1, 2, 0, 5])\n\n# First derivative: f'(x) = 3x² + 4x\ndf_dx = f_cubic.derivative()\nprint(df_dx) # Output: 3x^2 + 4x\n\n# Second derivative: f''(x) = 6x + 4\nd2f_dx2 = f_cubic.nth_derivative(2)\nprint(d2f_dx2) # Output: 6x + 4`}</CodeBlock>
          </section>
          <section>
            <h3 className="font-semibold">Solving and Root-Finding</h3>
            <p>This is the core feature of PolySolve. You can find the x-values for any given y-value using a powerful genetic algorithm.</p>
            <CodeBlock>{`# Find x where f(x) = 50, for f(x) = 3x² - 1\nf = polysolve.Function(2)\nf.set_coeffs([3, 0, -1])\n\n# This finds x-values that result in y=50\nx_solutions = f.solve_x(y_val=50)\nprint(x_solutions) # Will show values approximate to 4.12 and -4.12\n\n# get_real_roots() is a convenient shortcut for solve_x(y_val=0)\nroots = f.get_real_roots()\nprint(roots) # Will show values approximate to 0.577 and -0.577`}</CodeBlock>
          </section>
          <section>
            <h3 className="font-semibold">Arithmetic Operations</h3>
            <p><code>Function</code> objects support addition, subtraction, and multiplication.</p>
            <CodeBlock>{`f1 = polysolve.Function(2)\nf1.set_coeffs([1, 2, 1]) # x² + 2x + 1\n\nf2 = polysolve.Function(1)\nf2.set_coeffs([3, -4])   # 3x - 4\n\n# Addition: (x² + 2x + 1) + (3x - 4) = x² + 5x - 3\nf_add = f1 + f2\nprint(f"Addition: {f_add}")\n\n# Subtraction: (x² + 2x + 1) - (3x - 4) = x² - x + 5\nf_sub = f1 - f2\nprint(f"Subtraction: {f_sub}")\n\n# Multiplication: (x² + 2x + 1) * (3) = 3x² + 6x + 3\nf_mul_scalar = f1 * 3\nprint(f"Scalar Multiplication: {f_mul_scalar}")\n\n# Function Multiplication: (x² + 2x + 1) * (3x - 4)\nf_mul_func = f1 * f2\nprint(f"Function Multiplication: {f_mul_func}")`}</CodeBlock>
          </section>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}