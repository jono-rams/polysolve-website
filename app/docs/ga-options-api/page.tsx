import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";

export default function GaOptionsPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">GA_Options API</h1>
      <Card>
        <CardHeader>
          <CardTitle>5. API Reference: `GA_Options` Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The <code>GA_Options</code> dataclass allows you to fine-tune the genetic algorithm used in the <code>solve_x</code> and <code>get_real_roots</code> methods.</p>
          <CodeBlock language="python">
{`from polysolve import Function, GA_Options

# Configure a more exhaustive search
custom_options = GA_Options(
    min_range=-100.0,
    max_range=100.0,
    num_of_generations=10,
    data_size=500000,
    sample_size=100,
    mutation_percentage=0.01
)

f = Function(5)
f.set_coeffs([1, 0, -15, 0, 10, 0])
roots = f.get_real_roots(options=custom_options)`}
          </CodeBlock>
          <h4 className="text-xl font-semibold pt-2">Parameters</h4>
          <ul className="!mt-2 space-y-6">
            <li>
              <p><strong><code>min_range</code> / <code>max_range</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The lower and upper bounds for the initial random search space.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>-100.0</code> / <code>100.0</code>
              </p>
            </li>

            <li>
              <p><strong><code>num_of_generations</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The number of iterations the algorithm will run. More generations can lead to more accurate results.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>10</code>
              </p>
            </li>

            <li>
              <p><strong><code>data_size</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The total number of "solutions" generated in each generation. A larger size increases the chance of finding roots but is more computationally expensive.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>100000</code>
              </p>
            </li>

            <li>
              <p><strong><code>sample_size</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The number of top-performing solutions from one generation that are used to create the next.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>1000</code>
              </p>
            </li>

            <li>
              <p><strong><code>mutation_percentage</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The small, random amount by which the top solutions are altered each generation to explore the nearby search space.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>0.01</code> (1%)
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}