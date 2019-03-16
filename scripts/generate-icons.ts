// tslint:disable no-implicit-dependencies

import * as fs from 'fs-extra';
import * as path from 'path';
import * as sharp from 'sharp';
import * as svgexport from 'svgexport';
import * as util from 'util';

const renderAsync = util.promisify(svgexport.render);

(async () => {
  const sizes = [16, 19, 20, 24, 32, 38, 48, 64, 96];

  const inputPath = path.resolve(__dirname, '../assets/icon.svg');
  const outputPath = (size: number) => path.resolve(__dirname, `../icons/icon-${size}.png`);

  const options = sizes.map(size => ({
    input: [inputPath, `${size}:${size}`],
    output: [outputPath(size)],
  }));

  console.log('Removing existing icons');
  await fs.remove(path.resolve(__dirname, '../icons'));

  console.log(`Creating ${sizes.length} icons based on ${inputPath} with the following sizes: ${sizes.join(', ')}`);
  await renderAsync(options);

  console.log('Creating a padded 128x128 icon based on the 96x96 icon');

  const paddedIconPath = outputPath(128);
  const padding = 16;

  await fs.copyFile(outputPath(96), paddedIconPath);
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

  await fs.writeFile(paddedIconPath, buffer);
})();
