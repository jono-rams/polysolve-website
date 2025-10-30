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
          <p>
            PolySolve is a high-performance Python library for creating,
            manipulating, and solving polynomial functions. It provides an
            intuitive, object-oriented API for calculus operations and features a
            powerful, <strong>Numba-accelerated</strong> genetic algorithm for
            finding approximate real roots of polynomials of any degree.
          </p>
          <p>
            For the default CPU solver, PolySolve uses Numba to JIT-compile and
            parallelize operations for a massive speedup over standard Python.
            For users with compatible NVIDIA hardware, it also offers optional
            CUDA acceleration for its genetic algorithm, delivering performance
            gains for large-scale parallel problems.
          </p>
          <p>
            The core of the library is the <code>Function</code> object, which
            represents a polynomial of the form: c<sub>0</sub>x<sup>n</sup> + c
            <sub>1</sub>x<sup>n-1</sup> + ... + c<sub>n</sub>.
          </p>
        </CardContent>
      </Card>
      <DocsPagination />
    </div>
  );
}