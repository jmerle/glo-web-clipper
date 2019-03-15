const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const svgexport = require('svgexport');
const sharp = require('sharp');

const sizes = [16, 19, 20, 24, 32, 38, 48, 64, 96];

const inputPath = path.resolve(__dirname, '../assets/icon.svg');
const outputPath = size => path.resolve(__dirname, `../icons/icon-${size}.png`);

const options = sizes.map(size => ({
  input: [inputPath, `${size}:${size}`],
  output: [outputPath(size)],
}));

console.log('Removing existing icons');
rimraf(path.resolve(__dirname, '../icons'), () => {
  console.log(`Creating ${sizes.length} icons based on ${inputPath} with the following sizes: ${sizes.join(', ')}`);
  svgexport.render(options, () => {
    console.log('Creating a padded 128x128 icon based on the 96x96 icon');
    const paddedIconPath = outputPath(128);

    fs.copyFile(outputPath(96), paddedIconPath, copyErr => {
      if (copyErr) {
        throw copyErr;
      }

      sharp(paddedIconPath)
        .extend({
          top: 16,
          bottom: 16,
          left: 16,
          right: 16,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0,
          },
        })
        .toBuffer()
        .then(data => {
          fs.writeFile(paddedIconPath, data, writeErr => {
            if (writeErr) {
              throw writeErr;
            }

            console.log('Done!');
          });
        })
        .catch(console.error);
    });
  });
});
