// tslint:disable no-implicit-dependencies

import chromeLaunch = require('chrome-launch');

chromeLaunch('https://imgur.com/', {
  args: ['--start-maximized', '--load-extension=./build'],
});
