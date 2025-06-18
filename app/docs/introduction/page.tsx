import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsPagination } from "@/components/DocsPagination";

export default function IntroductionPage() {
  return (
    <div className="space-y-8 prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">PolySolve Documentation</h1>
      <Card>
        <CardHeader>
          <CardTitle>1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>PolySolve is a high-performance Python library for creating, manipulating, and solving polynomial functions. It provides an intuitive, object-oriented API for calculus operations and features a powerful genetic algorithm for finding approximate real roots of polynomials of any degree.</p>
          <p>For users with compatible NVIDIA hardware, PolySolve offers optional CUDA acceleration for its genetic algorithm, delivering massive performance gains for computationally intensive problems.</p>
          <p>The core of the library is the <code>Function</code> object, which represents a polynomial of the form: $c_0x^n + c_1x^{"n-1"} + ... + c_n$.</p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}