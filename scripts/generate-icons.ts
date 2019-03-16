// tslint:disable no-implicit-dependencies

import { copyFile, remove, writeFile } from 'fs-extra';
import { resolve } from 'path';
import * as sharp from 'sharp';
import { render } from 'svgexport';
import { promisify } from 'util';

const renderAsync = promisify(render);

(async () => {
  const sizes = [16, 19, 20, 24, 32, 38, 48, 64, 96];

  const inputPath = resolve(__dirname, '../assets/icon.svg');
  const outputPath = (size: number) => resolve(__dirname, `../icons/icon-${size}.png`);

  const options = sizes.map(size => ({
    input: [inputPath, `${size}:${size}`],
    output: [outputPath(size)],
  }));

  console.log('Removing existing icons');
  await remove(resolve(__dirname, '../icons'));

  console.log(`Creating ${sizes.length} icons based on ${inputPath} with the following sizes: ${sizes.join(', ')}`);
  await renderAsync(options);

  console.log('Creating a padded 128x128 icon based on the 96x96 icon');

  const paddedIconPath = outputPath(128);
  const padding = 16;

  await copyFile(outputPath(96), paddedIconPath);
  const buffer = await sharp(paddedIconPath)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    })
    .toBuffer();

  await writeFile(paddedIconPath, buffer);
})();
