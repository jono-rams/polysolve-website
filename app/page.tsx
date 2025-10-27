import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Cpu, Gauge, Zap } from "lucide-react";

import CodeBlock from "@/components/CodeBlock";

export default function Home() {
  const features = [
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
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Genetic Algorithm Solver",
      description: "Finds real roots for complex polynomials using a powerful, parallelizable genetic algorithm.",
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
          The Modern Python Polynomial Solver
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A robust and high-performance library for calculus, root-finding, and arithmetic.
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
# Expected output: [-1.0001, 2.5003]
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

      {/* TODO: Benchmark Section
            
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-6">Blazing Fast Performance</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          See how PolySolve (GPU) compares against standard NumPy and CPU-based operations.
        </p>
        <Card>
          <CardContent className="p-4 md:p-6">
            <Image 
              src="/benchmark-chart-placeholder.png"
              alt="PolySolve Benchmark Chart" 
              width={800} 
              height={450} 
              className="w-full h-auto rounded-md object-contain bg-secondary"
            />
          </CardContent>
        </Card>
      </section> */}
      
    </div>
  );
}