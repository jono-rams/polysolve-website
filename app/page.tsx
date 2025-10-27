import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Cpu, Gauge, Zap, AlertTriangle } from "lucide-react";

import CodeBlock from "@/components/CodeBlock";

export default function Home() {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Numerically Stable Solver",
      description: "Uses a robust genetic algorithm to find correct roots for high-degree polynomials where traditional methods like NumPy suffer from instability and fail.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "CUDA Accelerated",
      description: "Leverage your NVIDIA GPU for massive speedups on large datasets. Perfect for data science and research.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "Efficient NumPy Fallback",
      description: "No GPU? No problem. PolySolve runs efficiently on CPU using optimized NumPy operations.",
    },
    {
      icon: <Gauge className="h-8 w-8 text-primary" />,
      title: "Intuitive API",
      description: "Use natural Python operators (+, -, *) to perform polynomial calculus and arithmetic effortlessly.",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="text-center">
        <div style={{display: "flex", justifyContent: "center"}}>
          <Image src="/PolySolve-Logo.png" alt='PolySolve Logo' width={256} height={256} className='h-auto w-auto' ></Image>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter my-3 py-2">
          The <span className="text-green-500">Accurate</span> Python Polynomial Solver
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Finds stable, correct roots for high-degree polynomials where standard methods like NumPy fail due to numerical instability. Robust calculus and arithmetic included.
        </p>
        <div className="mt-8">
          <Card className="max-w-md mx-auto bg-secondary">
            <CardContent className="p-4">
              <code className="font-mono text-lg md:text-xl">
                <span className="text-green-400">$</span> pip install polysolve
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-6">
          Get Started in 30 Seconds
        </h2>
        
        <CodeBlock language='python'>
          {`
import polysolve

# Create an object representing f(x) = 2x^2 - 3x - 5
f1 = polysolve.Function(2)
f1.set_coeffs([2, -3, -5])

# Find the approximate real roots
roots = f1.get_real_roots()
print(roots)
# Expected accurate output: [-1.0001, 2.5003] after internal clustering)
  `}
        </CodeBlock>
      </section>

      <section className="text-center">
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="text-lg p-6">
            <Link href="/demo">Try the Live Demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg p-6">
            <Link href="/docs">Read the Docs</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 1. Accuracy Chart */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-6">Accuracy Where It Matters Most</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
          Standard libraries like NumPy can be fast for low degrees, but suffer from catastrophic <span className="text-red-500 font-semibold">numerical instability</span> on high-degree polynomials, leading to massive errors. PolySolve&lsquo;s genetic algorithm is designed for stability, delivering accurate results you can trust.
        </p>
        <Card>
          <CardHeader className="items-center">
             <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500"/>
                NumPy Instability vs. PolySolve Stability
             </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <Image 
              src="/benchmark-accuracy-chart.png"
              alt="PolySolve Benchmark: Accuracy (MAE) vs NumPy" 
              width={1000} 
              height={600} 
              className="w-full h-auto rounded-md object-contain"
            />
          </CardContent>
        </Card>
      </section>

      {/* 2. Speed Chart */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-6">The Performance Trade-off for Accuracy</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
          Achieving numerical stability requires a more computationally intensive algorithm. PolySolve (CPU) is slower than NumPy, but crucially, it provides the <span className="text-green-500 font-semibold">correct answer</span>. For practical speed, PolySolve (GPU) offers a massive acceleration.
        </p>
        <Card>
           <CardHeader className="items-center">
             <CardTitle className="text-xl">Performance vs. Problem Complexity</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <Image 
              src="/benchmark-speed-chart.png"
              alt="PolySolve Benchmark: Speed Comparison" 
              width={1000} 
              height={600} 
              className="w-full h-auto rounded-md object-contain"
            />
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-6">CUDA Makes Accuracy Practical</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
          PolySolve&lsquo;s CUDA acceleration delivers a significant speedup compared to its own CPU implementation, making it feasible to solve complex, high-degree polynomials accurately in seconds, not minutes.
        </p>
        <Card>
           <CardHeader className="items-center">
             <CardTitle className="text-xl">PolySolve GPU vs. CPU Speedup</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <Image 
              src="/benchmark-speedup-chart.png"
              alt="PolySolve Benchmark: GPU Speedup Factor" 
              width={1000} 
              height={600} 
              className="w-full h-auto rounded-md object-contain"
            />
          </CardContent>
        </Card>
      </section>

      {/* Benchmark Notes */}
      <section className="text-center">
        <p className="max-w-4xl mx-auto text-sm text-muted-foreground">
          <strong>Benchmark Notes:</strong> The charts above compare PolySolve against NumPy on randomly generated polynomials of varying degrees. PolySolve&lsquo;s Genetic Algorithm was configured for high accuracy using these options: <code>num_of_generations=150</code>, <code>data_size=1000000</code>, <code>mutation_strength=0.005</code>, <code>elite_ratio=0.1</code>, <code>crossover_ratio=0.5</code>, <code>mutation_ratio=0.4</code>, <code>root_precision=10</code>. For full benchmark details and code, see the <Link href="/docs/benchmarks" className="text-primary underline">Documentation</Link>.
        </p>
      </section>
      
    </div>
  );
}