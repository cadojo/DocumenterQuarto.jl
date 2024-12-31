# 📚🌐 Julia Package Documentation via Quarto

*Use [`Documenter`](https://GitHub.com/JuliaDocs/Documenter.jl) syntax with [Quarto](https://quarto.org).*

## Overview

*What is `DocumenterQuarto`?*

[Quarto](https://quarto.org) is a single-source multi-target technical publishing system which can render HTML, PDF, DOCX, and many (many, many) other targets.
The source format for Quarto is a flavor of Markdown that allows for executing code, including Julia code!
This allows for documentation generation alongside executable code examples.

`DocumenterQuarto` generates templates for Quarto websites ([books](https://quarto.org/docs/books/), more precisely) which automatically document your Julia package, as well as utility functions to automatically parse Julia's `@doc` output into Quarto Markdown.
The workflow for rendering and publishing your documentation is identical to that of `Documenter`, so your CI should not need to change too much!

## Installation

*Choose one of the two lines below!*

``` julia
Pkg.add("DocumenterQuarto")  # in Julia code
```

``` julia
pkg> add DocumenterQuarto    # in Julia's REPL
```

You will also need to download [Quarto](https://quarto.org/docs/get-started/), and install Jupyter.
The simplest option for installing Jupyter is often: `python -m pip install --user jupyter`.

## Usage

*Using `DocumenterQuarto` for your package.*

### Documenting a New Package

If you don't already have documentation for your package, use the following steps to generate a new documentation website.

1.  Navigate to the **root directory** of your Julia package.
2.  Execute the code below.

``` julia
import Pkg
Pkg.add(url="https://github.com/cadojo/DocumenterQuarto.jl")

import DocumenterQuarto
DocumenterQuarto.generate()
```

### Documenting an Existing Package

If your package already has documentation, it is likely that the migration to a Quarto-based website will be easy!
At this time, the simplest approach is likely to move your existing documentation, generate a new documentation site with the instructions above, and then move select Markdown files from your old documentation back into your new `docs/src` directory.
There are some tips that are helpful to keep in mind.

1.  In `Documenter`, you use `@example` to execute (and show) a block of code. In Quarto, this is provided by [execution options](https://quarto.org/docs/computations/julia.html) and code blocks. In most cases, you can simply replace `@example` with `{julia}` and the code should execute when your documentation is rendered!
2.  All codes are executed in `Main`, and are scoped to each individual file.
3.  To have executable code in your Markdown, you have to use the `.qmd` file extension.

### Quarto and Julia Environments

Quarto may automatically find a Julia environment.
If you run into environment issues while rendering, try the following code.

``` julia
import Pkg
Pkg.activate("docs")
Pkg.develop(path=".")
Pkg.instantiate()
```

### Compatibility with `LiveServer`

This workflow is fully compatible with `LiveServer`!
If using the `make.jl` script generated with `DocumenterQuarto.generate`, then you can serve the documentation locally with the following code.

``` julia
using LiveServer

servedocs(skip_dir="docs/src/.quarto")
```

## Alternatives

*Other excellent documentation packages.*

There are plenty of documentation tools and packages in the Julia ecosystem; most of them are more robust and have more developer support than this package!
Only a couple of alternative packages are shown below.

-   [`Documenter.jl`](https://GitHub.com/JuliaDocs/Documenter.jl) is the primary documentation package in the Julia ecosystem.

-   [`QuartoDocBuilder.jl`](https://github.com/vituri/QuartoDocBuilder.jl) is the first Quarto documentation package for Julia, and provides a simpler *out-of-the-box* Quarto project which looks excellent.
