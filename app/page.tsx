import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Cpu, Gauge, Zap } from "lucide-react";

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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          The Modern Python Polynomial Solver
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A robust and high-performance library for calculus, root-finding, and arithmetic.
        </p>
        <div className="mt-8">
          <Card className="max-w-md mx-auto bg-secondary">
            <CardContent className="p-4">
              <code className="font-mono text-sm">
                <span className="text-green-400">$</span> pip install polysolve
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
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
    </div>
  );
}