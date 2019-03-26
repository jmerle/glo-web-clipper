# Glo Web Clipper

[![Build Status](https://jenkins.jmerle.dev/buildStatus/icon?job=glo-web-clipper%2Fmaster)](https://jenkins.jmerle.dev/job/glo-web-clipper/job/master/)

Clip anything, describe it and save it to a GitKraken Glo card.

Use Glo Web Clipper to easily capture snippets of the web to a new or existing GitKraken Glo card. Optionally, you can also include a link to the website you're on and write a description about the clipped content or the link.

Clipping options:
- "Visible page" will take a screenshot of everything that's currently visible.
- "Full page" will take a screenshot of the full page, including everything that is not visible.
- "Selection" will allow you to freely select a rectangle to clip on the currently visible page.
- Include a link to the current url
- Add a description

Saving options:
- Create a new card using Glo Web Clipper and attach the clipped content as a comment on the newly created card.
- Add the clipped content to an existing card as a comment.

## Running locally
The following commands can be used to start working on Competitive Companion locally. Additionally, make sure you got [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed.

```bash
# Clone the repository
git clone https://github.com/jmerle/glo-web-clipper.git

# cd into the extension folder
cd glo-web-clipper

# Install the dependencies
yarn

# Generate the icons and the API client
yarn generate

# Decide what you want to do next

# Build the code to the build/ directory
yarn build

# Build the code automatically when the source changes
yarn watch

# Lint the extension for possible mistakes
yarn lint

# Package the extension to a zip file
yarn package

# Launch a Firefox instance with Glo Web Clipper loaded into a temporary profile
# Automatically re-compiles the code when the source changes
# Automatically reloads the extension in the Firefox instance when the code is re-compiled
# Refresh the page after the extension got reloaded to see the new changes
yarn dev:firefox

# Does the same as dev:firefox but with Chrome, with the exception that the extension is not automatically reloaded
# You'll have to manually go to chrome://extensions and click on the reload button on the Competitive Companion entry
yarn dev:chrome
```

## Mozilla reviewers
The information provided below is meant for Mozilla volunteers.

Software versions used:  
Node.js: 10.15.0  
Yarn: 1.15.2

Third-party libraries that can be found in the extension:  
- [croppr 2.3.1](https://github.com/jamesssooi/Croppr.js/tree/v2.3.1/dist) (the css can be found at the top of [styles/components/_croppr.scss](styles/components/_croppr.scss))
- [hyperapp 1.2.9](https://github.com/jorgebucaran/hyperapp/blob/1.2.9/src/index.js)
- [merge-images 1.1.0](https://github.com/lukechilds/merge-images/blob/v1.1.0/src/index.js)
- [webextension-polyfill 0.4.0](https://github.com/mozilla/webextension-polyfill/blob/0.4.0/src/browser-polyfill.js)
- A modified version of [modern-normalize 0.5.0](https://github.com/sindresorhus/modern-normalize/blob/v0.5.0/modern-normalize.css) in [styles/utils/_normalize.scss](styles/utils/_normalize.scss)
- [Reset CSS 2.0](https://meyerweb.com/eric/tools/css/reset/) in [styles/utils/_reset.scss](styles/utils/_reset.scss)

Package the extension by `cd`'ing into the source code submission directory, installing the dependencies with `yarn` and packaging with `yarn package`. The result can be found in the dist/ directory.
