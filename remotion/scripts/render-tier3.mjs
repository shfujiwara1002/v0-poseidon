import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs/promises';

const renderHighFi = async () => {
    console.log('Rendering High Fidelity Demo...');

    const bundled = await bundle(path.join(process.cwd(), './src/index.ts'), () => undefined, {
        webpackOverride: (config) => config,
    });

    const compositions = await selectComposition({
        serveUrl: bundled,
        id: 'HighFidelityDemo',
        inputProps: {},
    });

    if (!compositions) {
        throw new Error('Composition HighFidelityDemo not found');
    }

    const outputDir = path.join(process.cwd(), '../output/high-fidelity');
    await fs.mkdir(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, 'fintech-hologram.png');

    await renderStill({
        composition: compositions,
        serveUrl: bundled,
        output: outputFile,
        imageFormat: 'png',
    });

    console.log(`Rendered high-fi asset to ${outputFile}`);
};

renderHighFi().catch(err => {
    console.error(err);
    process.exit(1);
});
