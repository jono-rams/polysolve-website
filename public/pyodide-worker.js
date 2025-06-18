const PYODIDE_VERSION = "v0.26.1";
importScripts(`https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/pyodide.js`);

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`,
  });
  await self.pyodide.loadPackage("numpy");
  await self.pyodide.loadPackage("micropip");
  await self.pyodide.runPythonAsync(`
    import micropip
    await micropip.install('polysolve')
  `);
}

const pyodideReadyPromise = loadPyodideAndPackages();

const createFunction = (coeffsStr) => {
  if (!coeffsStr) throw new Error("Coefficients cannot be empty.");
  const pyodide = self.pyodide;
  pyodide.globals.set('coeffs_str', coeffsStr);
  return pyodide.runPython(
    `
import polysolve
coeffs_list = [float(c.strip()) for c in coeffs_str.split(',')]
f = polysolve.Function(len(coeffs_list) - 1)
f.set_coeffs(coeffs_list)
f
`
  );
};

self.onmessage = async (event) => {
  await pyodideReadyPromise;
  const { type, payload, id } = event.data;

  try {
    let result;
    
    const coeffs = type === 'add' || type === 'multiply' ? payload.coeffs1 : payload.coeffs;

    switch (type) {
      case 'format':
        result = createFunction(payload);
        break;
      case 'solve':
        const func_to_solve = createFunction(payload.coeffs);
        self.pyodide.globals.set('func_to_solve', func_to_solve);
        self.pyodide.globals.set('ga_opts_js', payload.options);

        result = await self.pyodide.runPythonAsync(`
          from polysolve import GA_Options

          # Convert the JavaScript options object to a Python dictionary
          ga_opts_dict = ga_opts_js.to_py()

          # Create the GA_Options instance by unpacking the dictionary
          ga_opts = GA_Options(**ga_opts_dict)
          
          # Call the method with the options
          roots = func_to_solve.get_real_roots(options=ga_opts)
          
          # Return the result as a string
          str(roots.tolist())
        `);
        
        self.postMessage({ type: 'result', requestType: type, payload: result });
        return;
      case 'evaluate':
        self.pyodide.globals.set('x_val', parseFloat(payload.xVal));
        result = createFunction(coeffs).solve_y(self.pyodide.globals.get('x_val'));
        break;
      case 'derivative':
        result = createFunction(coeffs).derivative();
        break;
      case 'nth_derivative':
        self.pyodide.globals.set('n_val', parseInt(payload.n, 10));
        result = createFunction(coeffs).nth_derivative(self.pyodide.globals.get('n_val'));
        break;
      case 'add':
        const func1_add = createFunction(payload.coeffs1);
        const func2_add = createFunction(payload.coeffs2);
        result = func1_add.__add__(func2_add);
        break;
      case 'multiply':
        const func1_mul = createFunction(payload.coeffs1);
        const func2_mul = createFunction(payload.coeffs2);
        result = func1_mul.__mul__(func2_mul);
        break;
      default:
        throw new Error(`Unknown command type: ${type}`);
    }

    if (type === 'format') {
      self.postMessage({ type: 'result', requestType: 'format', id: id, payload: String(result) });
    } else {
      self.postMessage({ type: 'result', requestType: type, payload: String(result) });
    }

  } catch (error) {
    self.postMessage({ type: 'error', payload: error.message });
  }
};

pyodideReadyPromise.then(() => {
  self.postMessage({ type: 'ready' });
});