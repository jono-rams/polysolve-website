import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";

export default function CudaPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">CUDA Acceleration</h1>
      <Card>
        <CardHeader>
          <CardTitle>7. Advanced: CUDA Acceleration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>One of PolySolve&apos;s most powerful features is its ability to offload the genetic algorithm&apos;s fitness calculations to a compatible NVIDIA GPU. This can result in dramatic speedups when using a large <code>data_size</code> in your <code>GA_Options</code>.</p>
          <p>This feature is ideal for modern NVIDIA GPUs (like the RTX 30 and 40 series). To use it, simply pass the <code>use_cuda=True</code> flag to the solver method.</p>
          <CodeBlock language="python">
{`# A high-degree polynomial that would be slow to solve on CPU
f_hard = Function(10)
f_hard.set_coeffs([1, 0, -45, 0, 210, 0, -420, 0, 315, 0, -1])

# Use a large data size to leverage the GPU's parallelism
ga_opts_gpu = GA_Options(data_size=2_000_000, num_of_generations=20)

# Run the solver with CUDA enabled
gpu_roots = f_hard.get_real_roots(options=ga_opts_gpu, use_cuda=True)`}
          </CodeBlock>
          <p>If <code>use_cuda</code> is set to <code>True</code> but PolySolve cannot detect a valid CuPy installation, it will fall back to the NumPy (CPU) implementation and issue a <code>UserWarning</code>.</p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}