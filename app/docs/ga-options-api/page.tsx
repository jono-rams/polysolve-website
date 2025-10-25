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
          <ul>
            <li><strong>min_range / max_range (float):</strong> The lower and upper bounds for the initial random search space. Default: -100.0 / 100.0.</li>
            <li><strong>num_of_generations (int):</strong> The number of iterations the algorithm will run. More generations can lead to more accurate results. Default: 10.</li>
            <li><strong>data_size (int):</strong> The total number of &quot;solutions&quot; generated in each generation. A larger size increases the chance of finding roots but is more computationally expensive. Default: 100000.</li>
            <li><strong>sample_size (int):</strong> The number of top-performing solutions from one generation that are used to create the next. Default: 1000.</li>
            <li><strong>mutation_percentage (float):</strong> The small, random amount by which the top solutions are altered each generation to explore the nearby search space. Default: 0.01 (1%).</li>
          </ul>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}