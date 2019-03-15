const chromeLaunch = require('chrome-launch');

chromeLaunch('https://imgur.com/', {
  args: ['--start-maximized', '--load-extension=./build'],
});
