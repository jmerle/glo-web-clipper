# Glo Web Clipper

A web clipper for GitKraken Glo Boards. Glo Web Clipper makes it easy to clip all or part of a website to a new or an existing card on a GitKraken Glo Board.

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

## Icons
The icons are from the [Noun Project](https://thenounproject.com/).

## Mozilla reviewers
The information provided below is meant for Mozilla volunteers.

Software versions used:  
Node.js: 10.15.0  
Yarn: 1.13.0

Third-party libraries that can be found in the extension:  
- [webextension-polyfill 0.4.0](https://github.com/mozilla/webextension-polyfill/blob/0.4.0/src/browser-polyfill.js)

Package the extension by `cd`'ing into the source code submission directory, installing the dependencies with `yarn` and packaging with `yarn package`. The result can be found in the dist/ directory.
