<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Browser DESeq2</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main>
    <header>
      <p class="eyebrow">Client-side RNA-seq analysis</p>
      <h1>Browser DESeq2</h1>
      <p>
        カウント行列とサンプル情報を読み込み、
        ユーザーのブラウザ内でDESeq2解析を実行します。
      </p>
    </header>

    <section class="notice">
      入力ファイルは通常、解析サーバーへ送信されません。
      計算はアクセスした端末のwebR上で行われます。
    </section>

    <section class="card">
      <h2>1. 解析環境</h2>
      <button id="initButton" type="button">DESeq2を読み込む</button>
      <p id="runtimeStatus" class="status">未初期化</p>
    </section>

    <section class="card grid">
      <div>
        <h2>2. カウント行列</h2>
        <label>
          counts.csv
          <input id="countsFile" type="file" accept=".csv,text/csv">
        </label>
        <p class="hint">
          先頭列はgene_id、2列目以降はサンプルごとの整数カウント。
        </p>
      </div>

      <div>
        <h2>3. サンプル情報</h2>
        <label>
          samples.csv
          <input id="metadataFile" type="file" accept=".csv,text/csv">
        </label>
        <p class="hint">
          sample列と、比較に使用する条件列が必要です。
        </p>
      </div>
    </section>

    <section class="card">
      <h2>4. 比較条件</h2>

      <div class="form-grid">
        <label>
          条件列
          <select id="conditionColumn" disabled></select>
        </label>

        <label>
          Control
          <select id="controlLevel" disabled></select>
        </label>

        <label>
          Treatment
          <select id="treatmentLevel" disabled></select>
        </label>

        <label>
          FDR alpha
          <input
            id="alpha"
            type="number"
            min="0.0001"
            max="0.5"
            step="0.01"
            value="0.05"
          >
        </label>

        <label>
          Size factor
          <select id="sfType">
            <option value="ratio">ratio</option>
            <option value="poscounts">poscounts</option>
            <option value="iterate">iterate</option>
          </select>
        </label>

        <label>
          Dispersion fit
          <select id="fitType">
            <option value="parametric">parametric</option>
            <option value="local">local</option>
            <option value="mean">mean</option>
          </select>
        </label>
      </div>

      <button id="runButton" type="button" disabled>
        DEG解析を実行
      </button>

      <p id="analysisStatus" class="status">
        入力ファイルを選択してください。
      </p>
    </section>

    <section id="downloads" class="card" hidden>
      <h2>5. 出力</h2>
      <div class="download-row">
        <button id="downloadResults" type="button">
          DESeq2 results CSV
        </button>
        <button id="downloadNormalized" type="button">
          Normalized counts CSV
        </button>
      </div>
    </section>

    <section class="card">
      <h2>入力例</h2>
      <p>
        <a href="./examples/counts.csv" download>counts.csv</a>
        /
        <a href="./examples/samples.csv" download>samples.csv</a>
      </p>
    </section>
  </main>

  <script src="./config.js"></script>
  <script type="module" src="./app.js"></script>
</body>
</html>
