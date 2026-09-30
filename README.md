# build_deseq2_webR

This repository contains a GitHub Actions workflow for building [DESeq2](https://bioconductor.org/packages/DESeq2/) for use with [webR](https://docs.r-wasm.org/webr/latest/).

DESeq2 and its dependencies are cross-compiled to WebAssembly using `rwasm` and bundled into a filesystem image that can be mounted by webR in a web browser.

## Files

The build procedure is contained in:

```text
.github/workflows/build-deseq2-wasm.yml
```

The workflow:

1. uses the official webR 0.6.0 Docker image;
2. configures the Emscripten compiler required to build `locfit`;
3. creates a pure-R, serial-only `BiocParallel` compatibility layer for browser execution;
4. builds DESeq2, `locfit`, and their dependencies using `rwasm::add_pkg()`;
5. creates a webR filesystem image using `rwasm::make_vfs_library()`.

## Build

Run the workflow manually from:

```text
GitHub repository
→ Actions
→ Build DESeq2 webR library
→ Run workflow
```

No local R or Emscripten installation is required.

The build runs inside:

```text
ghcr.io/r-wasm/webr:v0.6.0
```

The main DESeq2 build is performed with:

```r
rwasm::add_pkg(
    packages = c(
        shim_ref,
        "locfit",
        "bioc::DESeq2"
    ),
    repo_dir = repo_dir,
    dependencies = NA,
    remotes = NULL,
    compress = TRUE
)
```

After compilation, the R library is converted into a webR filesystem image with:

```r
rwasm::make_vfs_library(
    out_dir = image_dir,
    out_name = "library.data",
    repo_dir = repo_dir,
    compress = TRUE
)
```

## Output

After a successful GitHub Actions run, download the generated artifact.

It contains:

```text
library.data.gz
library.js.metadata
build-info.txt
```

`library.data.gz` contains the WebAssembly-compatible R package library, including DESeq2 and its dependencies.

## Using the library with webR

The generated library image should be placed with the web application and mounted into the webR filesystem.

For example:

```r
webr::mount(
    mountpoint = "/deseq2-library",
    source = "<URL to library.data>"
)

.libPaths(c(
    "/deseq2-library",
    .libPaths()
))

library(DESeq2)
```

The filesystem image should be used with the same compatible webR release used to build it.

DESeq2 is therefore **compiled in advance**, rather than compiled in the user's browser. At runtime, webR loads the precompiled library image and runs DESeq2 entirely in the browser.

## BiocParallel

Because standard parallel processing is not required for the browser implementation, the workflow replaces `BiocParallel` with a minimal pure-R, serial-only compatibility layer implementing the functions required by DESeq2.

DESeq2 should therefore be run with parallel execution disabled:

```r
dds <- DESeq(
    dds,
    parallel = FALSE
)

res <- results(
    dds,
    parallel = FALSE
)
```
