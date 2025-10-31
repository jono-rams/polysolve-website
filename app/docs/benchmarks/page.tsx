import { DocsPagination } from "@/components/DocsPagination";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const benchmarkScript = `
import numpy as np
import pandas as pd
import time
import polysolve

# Check for CUDA availability
try:
    import cupy
    _CUPY_AVAILABLE = True
    print("CuPy found. Running 3-way benchmark (NumPy, PolySolve CPU, PolySolve GPU)...")
except ImportError:
    _CUPY_AVAILABLE = False
    print("CuPy not found. Running 2-way benchmark (NumPy, PolySolve CPU)...")


def calculate_mae(coeffs, roots):
    """Calculates the mean absolute error by plugging roots back into the polynomial."""
    if roots.size == 0:
        return 0.0
    errors = np.abs(np.polyval(coeffs, roots.astype(complex)))
    return np.mean(errors)

def get_real_roots(roots):
    """Filters a numpy array for real roots (imaginary part < 1e-10)."""
    return roots[np.abs(np.imag(roots)) < 1e-10].real

def run_suite():
    """
    Runs the full 3-way benchmark suite for time and accuracy.
    """
    degrees = [2, 3, 5, 10, 20, 40, 60, 80, 100]
    repeat_count = 10 
    
    results = []
    print("Starting benchmark suite...")
    print(f"Degrees: {degrees}")
    print(f"Repeat Count: {repeat_count}")

    ga_options = polysolve.GA_Options(
        num_of_generations=150,
        data_size=1000000,
        mutation_strength=0.005,
        elite_ratio=0.1,
        crossover_ratio=0.5,
        mutation_ratio=0.4,
        root_precision=15
    )

    for deg in degrees:
        print(f"\nTesting Degree: {deg} (x{repeat_count} loops)")
        
        np_times, ps_cpu_times, ps_gpu_times = [], [], []
        np_maes, ps_cpu_maes, ps_gpu_maes = [], [], []

        for i in range(repeat_count):
            # Generate one polynomial for all methods
            coeffs = np.random.rand(deg + 1)
            ps_poly = polysolve.Function(deg)
            ps_poly.set_coeffs(coeffs)

            # --- 1. Test NumPy (CPU) ---
            start_np = time.perf_counter()
            np_all_roots = np.roots(coeffs)
            np_times.append(time.perf_counter() - start_np)
            np_real_roots = get_real_roots(np_all_roots)
            np_maes.append(calculate_mae(coeffs, np_real_roots))

            # --- 2. Test PolySolve (CPU) ---
            start_ps_cpu = time.perf_counter()
            ps_cpu_real_roots = ps_poly.get_real_roots(options=ga_options, use_cuda=False) 
            ps_cpu_times.append(time.perf_counter() - start_ps_cpu)
            ps_cpu_maes.append(calculate_mae(coeffs, ps_cpu_real_roots))
            
            # --- 3. Test PolySolve (GPU) ---
            if _CUPY_AVAILABLE:
                start_ps_gpu = time.perf_counter()
                ps_gpu_real_roots = ps_poly.get_real_roots(options=ga_options, use_cuda=True)
                ps_gpu_times.append(time.perf_counter() - start_ps_gpu)
                ps_gpu_maes.append(calculate_mae(coeffs, ps_gpu_real_roots))
            else:
                ps_gpu_times.append(np.nan)
                ps_gpu_maes.append(np.nan)

        # Calculate averages for this degree
        avg_np_time = np.mean(np_times)
        avg_ps_cpu_time = np.mean(ps_cpu_times)
        avg_ps_gpu_time = np.mean(ps_gpu_times)
        
        avg_np_mae = np.mean(np_maes)
        avg_ps_cpu_mae = np.mean(ps_cpu_maes)
        avg_ps_gpu_mae = np.mean(ps_gpu_maes)

        # Print results
        print(f"  NumPy (CPU):     Time: {avg_np_time:.6f}s | MAE: {avg_np_mae:.2e}")
        print(f"  PolySolve (CPU): Time: {avg_ps_cpu_time:.6f}s | MAE: {avg_ps_cpu_mae:.2e}")
        if _CUPY_AVAILABLE:
            print(f"  PolySolve (GPU): Time: {avg_ps_gpu_time:.6f}s | MAE: {avg_ps_gpu_mae:.2e}")

        results.append({
            "Degree": deg,
            "NumPy (CPU) Time": avg_np_time,
            "PolySolve (CPU) Time": avg_ps_cpu_time,
            "PolySolve (GPU) Time": avg_ps_gpu_time,
            "NumPy (CPU) MAE": avg_np_mae,
            "PolySolve (CPU) MAE": avg_ps_cpu_mae,
            "PolySolve (GPU) MAE": avg_ps_gpu_mae
        })

    df = pd.DataFrame(results)
    df.to_csv("benchmark_results.csv", index=False)
    
    print("\n--- Benchmark Complete ---")
    print(df)
    print("\nResults saved to benchmark_results.csv")

if __name__ == "__main__":
    run_suite()
`;

export default function BenchmarksPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Benchmarks</h1>

      <div className="space-y-4">
        <p>
          The charts on the <Link href="/">homepage</Link> demonstrate 
          PolySolve&lsquo;s stability and performance against NumPy. 
          The full Python script used to generate these results is 
          provided below.
        </p>
        <p>
          This script was designed to test two key metrics:
        </p>
        <ul>
          <li>
            <strong>Accuracy:</strong> It measures the Mean Absolute Error (MAE) 
            between the known roots of a generated polynomial and the 
            roots found by each library.
          </li>
          <li>
            <strong>Performance:</strong> It measures the wall-clock time 
            taken to solve polynomials of increasing degree.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold">Benchmark Script</h2>
      <CodeBlock language="python">
        {benchmarkScript}
      </CodeBlock>

      <DocsPagination />
    </div>
  );
}