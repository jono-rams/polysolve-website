// app/demo/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Balancer } from "react-wrap-balancer";

type PyodideState = "loading" | "ready" | "error";

// Reusable input component for polynomials
const PolynomialInput = ({ id, label, value, onChange, disabled, placeholder = "e.g., 2, -3, -5", formattedValue }) => (
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
          if(id === 1) setFormattedFunc1("");
          if(id === 2) setFormattedFunc2("");
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

  const runCalculation = (type: string) => {
    if (!workerRef.current) return;
    setIsCalculating(true);
    setOutput("Calculating...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any = { coeffs: coeffs1 };
    switch (type) {
      case 'evaluate': payload.xVal = xValue; break;
      case 'nth_derivative': payload.n = nValue; break;
      case 'add':
      case 'multiply':
        payload = { coeffs1: coeffs1, coeffs2: coeffs2 };
        break;
    }
    
    workerRef.current.postMessage({ type, payload });
  };

  const isButtonDisabled = pyodideState !== "ready" || isCalculating;

  // --- JSX RENDER ---
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Live Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>PolySolve Playground</CardTitle>
          {pyodideState === 'loading' && (
            <p className="text-sm text-amber-400">Initializing Python environment... This may take a moment.</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="roots" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="roots">Find Roots</TabsTrigger>
              <TabsTrigger value="evaluate">Evaluate at x</TabsTrigger>
              <TabsTrigger value="derivative">Derivative</TabsTrigger>
              <TabsTrigger value="nth_derivative">Nth Derivative</TabsTrigger>
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="multiply">Multiply</TabsTrigger>
            </TabsList>

            <TabsContent value="roots" className="mt-4 space-y-4">
              <PolynomialInput id="coeffs-roots" label="Polynomial Coefficients" value={coeffs1} onChange={(e) => setCoeffs1(e.target.value)} disabled={isButtonDisabled} formattedValue={formattedFunc1} />
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