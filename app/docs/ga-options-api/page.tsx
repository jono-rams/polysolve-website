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
          <p>The <code>GA_Options</code> dataclass allows you to fine-tune the genetic algorithm used in the <code>solve_x</code> and <code>get_real_roots</code> methods. You can trade speed for accuracy by adjusting the population size, number of generations, and the strategy ratios.</p>
          <CodeBlock language="python">
{`from polysolve import Function, GA_Options

# Configure a more exhaustive search with custom GA ratios
custom_options = GA_Options(
    num_of_generations=20,
    data_size=500000,
    mutation_strength=0.02, # Mutate by +/- 2%
    elite_ratio=0.1,        # 10% Elitism
    crossover_ratio=0.5,    # 50% Crossover
    mutation_ratio=0.3      # 30% Mutation
    # The remaining 10% will be new random solutions
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
                The number of iterations (generations) the algorithm will run. More generations can lead to more accurate results.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>10</code>
              </p>
            </li>

            <li>
              <p><strong><code>data_size</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The total number of &quot;solutions&quot; (the population size) generated in each generation. A larger size increases the chance of finding all roots but is more computationally expensive.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>100000</code>
              </p>
            </li>

            <li>
              <p><strong><code>sample_size</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The number of top-performing solutions to <strong>return</strong> at the very end of the process.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>int</code> | <strong>Default:</strong> <code>1000</code>
              </p>
            </li>

            <li>
              <p><strong><code>mutation_strength</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The percentage (e.g., 0.01 for 1%) by which a solution's value is randomly altered during a mutation.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>0.01</code> (1%)
              </p>
            </li>
            
            <li>
              <p><strong><code>elite_ratio</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The percentage (e.g., 0.05 for 5%) of the <strong>best</strong> solutions to carry over to the next generation unchanged (elitism).
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>0.05</code> (5%)
              </p>
            </li>
            
            <li>
              <p><strong><code>crossover_ratio</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The percentage (e.g., 0.45 for 45%) of the next generation to be created by "breeding" two solutions from the parent pool.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>0.45</code> (45%)
              </p>
            </li>
            
            <li>
              <p><strong><code>mutation_ratio</code></strong></p>
              <p className="!mt-1 ml-4 text-base">
                The percentage (e.g., 0.40 for 40%) of the next generation to be created by mutating solutions from the parent pool.
              </p>
              <p className="!mt-2 ml-4 text-sm text-muted-foreground">
                <strong>Type:</strong> <code>float</code> | <strong>Default:</strong> <code>0.40</code> (40%)
              </p>
            </li>
            
          </ul>
          <p><strong>Note:</strong> The sum of <code>elite_ratio</code>, <code>crossover_ratio</code>, and <code>mutation_ratio</code> must be less than or equal to 1.0. The remaining percentage of the population will be filled with new random solutions to ensure diversity.</p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}