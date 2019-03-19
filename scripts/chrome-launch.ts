// tslint:disable no-implicit-dependencies

import chromeLaunch = require('chrome-launch');

chromeLaunch('https://jaspervanmerle.com/', {
  args: ['--start-maximized', '--load-extension=./build'],
});
