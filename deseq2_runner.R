# webR + DESeq2

## 1. Build the DESeq2 filesystem image

Create a GitHub repository and copy:

```text
.github/workflows/build-deseq2-wasm.yml
```

Run the workflow manually from the Actions tab.

Download the artifact named:

```text
deseq2-webr-library
```

Extract it. It should contain:

```text
library.data
library.data.gz
library.js.metadata
```

## 2. Upload to server

Upload the contents of this project to:

```text
~/www/deseq/
```

The complete webR browser distribution must be under:

```text
~/www/deseq/webr/
```

Upload the DESeq2 library image to:

```text
~/www/deseq/library/
```

Expected layout:

```text
~/www/deseq/
├── index.html
├── app.js
├── config.js
├── styles.css
├── test-deseq2.html
├── .htaccess
├── r/
│   └── deseq2_runner.R
├── examples/
├── webr/
│   ├── webr.js
│   └── ...
└── library/
    ├── library.data
    ├── library.data.gz
    └── library.js.metadata
```

## 3. Test

Open:

```text
https://webpark2116.sakura.ne.jp/deseq/test-deseq2.html
```

Click `Run DESeq2`.

Once successful, open:

```text
https://webpark2116.sakura.ne.jp/deseq/
```

## Important

The filesystem image must be built for the same webR release as the webR files hosted under `webr/`.

This project targets webR 0.6.0 and uses:

```text
ghcr.io/r-wasm/webr:v0.6.0
```
