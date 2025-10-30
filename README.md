<p align="center">
  <img src="https://i.ibb.co/N22Gx6xq/Poly-Solve-Logo.png" alt="polysolve Logo" width="256">
</p>

[![PyPI version](https://img.shields.io/pypi/v/polysolve.svg)](https://pypi.org/project/polysolve/)
[![PyPI pyversions](https://img.shields.io/pypi/pyversions/polysolve.svg)](https://pypi.org/project/polysolve/)

A Python library for representing, manipulating, and solving polynomial equations using a high-performance genetic algorithm, with optional CUDA/GPU acceleration.

---

## Key Features

* **Numerically Stable Solver**: Makes complex calculations **practical**. Leverage your GPU to power the robust genetic algorithm, solving high-degree polynomials accurately in a reasonable timeframe.
* **Numba Accelerated CPU Solver**: The default genetic algorithm is JIT-compiled with Numba for high-speed CPU performance, right out of the box.
* **CUDA Accelerated**: Leverage NVIDIA GPUs for a massive performance boost when finding roots in large solution spaces.
* **Create and Manipulate Polynomials**: Easily define polynomials of any degree using integer or float coefficients, and perform arithmetic operations like addition, subtraction, multiplication, and scaling.
* **Analytical Solvers**: Includes standard, exact solvers for simple cases (e.g., `quadratic_solve`).
* **Simple API**: Designed to be intuitive and easy to integrate into any project.
