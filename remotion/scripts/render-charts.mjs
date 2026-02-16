import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs/promises';

const renderCharts = async () => {
  console.log('Rendering charts...');

  const bundled = await bundle(path.join(process.cwd(), './src/index.ts'), () => undefined, {
    webpackOverride: (config) => config,
  });

  const outputDir = path.join(process.cwd(), '../output/charts');
  await fs.mkdir(outputDir, { recursive: true });

  const chartCompositions = [
    { id: 'ChartDemo', file: 'chart-demo.png' },
    { id: 'ChartSpecDemo', file: 'chart-spec-demo.png' },
  ];

  for (const chart of chartCompositions) {
    const composition = await selectComposition({
      serveUrl: bundled,
      id: chart.id,
      inputProps: {},
    });

    if (!composition) {
      throw new Error(`Composition ${chart.id} not found`);
    }

    const outputFile = path.join(outputDir, chart.file);
    await renderStill({
      composition,
      serveUrl: bundled,
      output: outputFile,
      imageFormat: 'png',
    });

    console.log(`Rendered chart to ${outputFile}`);
  }
};

renderCharts().catch(err => {
  console.error(err);
  process.exit(1);
});
