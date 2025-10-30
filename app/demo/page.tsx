"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Balancer } from "react-wrap-balancer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

type PyodideState = "loading" | "ready" | "error";

type GaOptionKey = "min_range" | "max_range" | "num_of_generations" | "data_size" | "mutation_strength" | "elite_ratio" | "crossover_ratio" | "mutation_ratio" | "selection_percentile" | "blend_alpha" | "root_precision";

type PolynomialInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder?: string;
  formattedValue: string;
};

// Reusable input component for polynomials
const PolynomialInput = ({
  id,
  label,
  value,
  onChange,
  disabled,
  placeholder = "e.g., 2, -3, -5",
  formattedValue
}: PolynomialInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} />
    {formattedValue && (
      <div className="text-sm text-muted-foreground bg-secondary/50 rounded-md px-3 py-2 font-mono text-center">
        <Balancer>f(x) = {formattedValue}</Balancer>
      </div>
    )}
  </div>
);


export default function DemoPage() {
  const [pyodideState, setPyodideState] = useState<PyodideState>("loading");
  const [isCalculating, setIsCalculating] = useState(false);
  const [output, setOutput] = useState("Result will be displayed here.");

  const [coeffs1, setCoeffs1] = useState("2, -3, -5");
  const [coeffs2, setCoeffs2] = useState("1, 1");
  const [xValue, setXValue] = useState("5");
  const [nValue, setNValue] = useState("2");

  const [formattedFunc1, setFormattedFunc1] = useState("");
  const [formattedFunc2, setFormattedFunc2] = useState("");

  const [gaOptions, setGaOptions] = useState({
    min_range: "-100.0",
    max_range: "100.0",
    num_of_generations: "10",
    data_size: "10000",
    mutation_strength: "0.01",
    elite_ratio: "0.05",
    crossover_ratio: "0.45",
    mutation_ratio: "0.40",
    selection_percentile: "0.66",
    blend_alpha: "0.5",
    root_precision: "2",
  });

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker('/pyodide-worker.js');
    const onMessage = (event: MessageEvent) => {
      const { type, requestType, payload, id } = event.data;

      switch (type) {
        case 'ready':
          setPyodideState('ready');
          // Format the initial default values on load
          workerRef.current?.postMessage({ type: 'format', payload: "2, -3, -5", id: 1 });
          workerRef.current?.postMessage({ type: 'format', payload: "1, 1", id: 2 });
          break;
        case 'result':
          if (requestType === 'format') {
            if (id === 1) setFormattedFunc1(payload);
            if (id === 2) setFormattedFunc2(payload);
            return;
          }

          let resultPrefix = "Result:";
          switch (requestType) {
            case 'solve': resultPrefix = "Approximate Roots:"; break;
            case 'evaluate': resultPrefix = "Result (y-value):"; break;
            case 'derivative': resultPrefix = "Derivative:"; break;
            case 'nth_derivative': resultPrefix = `${nValue}th Derivative:`; break;
            case 'add': resultPrefix = "Summed Function:"; break;
            case 'multiply': resultPrefix = "Product Function:"; break;
          }
          setOutput(`${resultPrefix} ${payload}`);
          setIsCalculating(false);
          break;
        case 'error':
          setOutput(`Error: ${payload}`);
          if (id === 1) setFormattedFunc1("");
          if (id === 2) setFormattedFunc2("");
          setIsCalculating(false);
          break;
      }
    };
    workerRef.current.addEventListener('message', onMessage);
    return () => workerRef.current?.terminate();
  }, [nValue]);

  // Debounced effect for the first coefficient input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (pyodideState === 'ready') {
        workerRef.current?.postMessage({ type: 'format', payload: coeffs1, id: 1 });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [coeffs1, pyodideState]);

  // Debounced effect for the second coefficient input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (pyodideState === 'ready') {
        workerRef.current?.postMessage({ type: 'format', payload: coeffs2, id: 2 });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [coeffs2, pyodideState]);

  // Generic handler for GA option input changes
  const handleGaOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGaOptions(prev => ({
      ...prev,
      [name as GaOptionKey]: value
    }));
  };

  // --- CALCULATION HANDLER ---
  const runCalculation = (type: string) => {
    if (!workerRef.current) return;
    setIsCalculating(true);
    setOutput("Calculating...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any = {};
    switch (type) {
      case 'solve':
        const optionsWithNumbers = Object.fromEntries(
          Object.entries(gaOptions).map(([key, value]) => [
            key,
            // Use a fallback of 0 if the string is empty or invalid
            parseFloat(value) || 0
          ])
        );

        console.log("Sending GA Options to worker:", optionsWithNumbers);

        payload = { coeffs: coeffs1, options: optionsWithNumbers };
        break;
      case 'evaluate': payload = { coeffs: coeffs1, xVal: xValue }; break;
      case 'nth_derivative': payload = { coeffs: coeffs1, n: nValue }; break;
      case 'add':
      case 'multiply':
        payload = { coeffs1: coeffs1, coeffs2: coeffs2 };
        break;
      case 'derivative':
        payload = { coeffs: coeffs1 };
        break;
    }

    workerRef.current.postMessage({ type, payload });
  };

  const isButtonDisabled = pyodideState !== "ready" || isCalculating;
  const gaOptionsList: { name: GaOptionKey; label: string; description: string; }[] = [
    { name: 'min_range', label: 'Min Range', description: 'The minimum value for the initial random solutions.' },
    { name: 'max_range', label: 'Max Range', description: 'The maximum value for the initial random solutions.' },
    { name: 'num_of_generations', label: 'Generations', description: 'The number of iterations the algorithm will run.' },
    { name: 'data_size', label: 'Data Size (Population)', description: 'The total number of solutions generated in each generation.' },
    { name: 'mutation_strength', label: 'Mutation Strength', description: 'The percentage (e.g., 0.01 for 1%) by which a solution is mutated.' },
    { name: 'elite_ratio', label: 'Elite Ratio', description: 'The percentage (e.g., 0.05 for 5%) of the best solutions to carry over unchanged.' },
    { name: 'crossover_ratio', label: 'Crossover Ratio', description: 'The percentage (e.g., 0.45 for 45%) of the next generation created by breeding.' },
    { name: 'mutation_ratio', label: 'Mutation Ratio', description: 'The percentage (e.g., 0.40 for 40%) of the next generation created by mutation.' },
    { name: 'selection_percentile', label: 'Selection Percentile', description: 'Top % of solutions for the crossover parent pool. A larger value (e.g., 0.75) helps find all roots.' },
    { name: 'blend_alpha', label: 'Blend Alpha (BLX-α)', description: 'Crossover expansion factor. 0.0 = no expansion, 0.5 = 50% expansion. Good for exploration.' },
    { name: 'root_precision', label: 'Root Precision', description: 'Decimal places to round roots to for clustering unique results.' },
  ];

  // --- JSX RENDER ---
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold">Live Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>PolySolve Playground</CardTitle>
          {pyodideState === 'loading' && (
            <p className="text-sm text-amber-400">Initializing Python environment... This may take a moment.</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="roots" className="w-full">
            <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:h-10 md:grid-cols-6">
              <TabsTrigger value="roots">Find Roots</TabsTrigger>
              <TabsTrigger value="evaluate">Evaluate at x</TabsTrigger>
              <TabsTrigger value="derivative">Derivative</TabsTrigger>
              <TabsTrigger value="nth_derivative">Nth Derivative</TabsTrigger>
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="multiply">Multiply</TabsTrigger>
            </TabsList>

            <TabsContent value="roots" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-roots" label="Polynomial Coefficients" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Advanced Genetic Algorithm Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {gaOptionsList.map(opt => (
                        <div key={opt.name} className="space-y-2">
                          <Label htmlFor={opt.name} className="flex items-center">
                            {opt.label}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild><HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" /></TooltipTrigger>
                                <TooltipContent><p>{opt.description}</p></TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input id={opt.name} name={opt.name} type="number" value={gaOptions[opt.name]} onChange={handleGaOptionChange} disabled={isButtonDisabled} />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-amber-400 pt-4 px-1">
                      <strong>Note:</strong> Higher root precision requires more intensive GA settings (generations/population) than used in this demo. For best results here, keep precision low (e.g., 2-3).
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button onClick={() => runCalculation('solve')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Find Roots'}</Button>
            </TabsContent>

            <TabsContent value="evaluate" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-eval" label="Polynomial Coefficients" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <div className="space-y-2">
                <Label htmlFor="x-val">X-Value to Evaluate</Label>
                <Input id="x-val" value={xValue} onChange={(e) => setXValue(e.target.value)} disabled={isButtonDisabled} />
              </div>
              <Button onClick={() => runCalculation('evaluate')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Evaluate'}</Button>
            </TabsContent>

            <TabsContent value="derivative" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-deriv" label="Polynomial Coefficients" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <Button onClick={() => runCalculation('derivative')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Calculate Derivative'}</Button>
            </TabsContent>

            <TabsContent value="nth_derivative" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-nth" label="Polynomial Coefficients" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <div className="space-y-2">
                <Label htmlFor="n-val">Order &apos;n&apos;</Label>
                <Input id="n-val" type="number" value={nValue} onChange={(e) => setNValue(e.target.value)} disabled={isButtonDisabled} />
              </div>
              <Button onClick={() => runCalculation('nth_derivative')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Calculate Nth Derivative'}</Button>
            </TabsContent>

            <TabsContent value="add" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-add1" label="First Polynomial (f1)" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <PolynomialInput id="coeffs-add2" label="Second Polynomial (f2)" value={coeffs2} onChange={(e) => setCoeffs2(e.target.value)} disabled={isButtonDisabled} placeholder="e.g., 1, 1" formattedValue={formattedFunc2} />
              <Button onClick={() => runCalculation('add')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Add f1 + f2'}</Button>
            </TabsContent>

            <TabsContent value="multiply" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-mul1" label="First Polynomial (f1)" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
              <PolynomialInput id="coeffs-mul2" label="Second Polynomial (f2)" value={coeffs2} onChange={(e) => setCoeffs2(e.target.value)} disabled={isButtonDisabled} placeholder="e.g., 1, 1" formattedValue={formattedFunc2} />
              <Button onClick={() => runCalculation('multiply')} disabled={isButtonDisabled}>{isCalculating ? 'Calculating...' : 'Multiply f1 * f2'}</Button>
            </TabsContent>
          </Tabs>

          {output && (
            <div className="space-y-2 pt-4">
              <h3 className="font-semibold">Result:</h3>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto"><code className="font-mono text-sm">{output}</code></pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}