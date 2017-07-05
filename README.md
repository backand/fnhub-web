# Fnhub

Publish and consume lambda functions.

## Prerequisites
- Install Node latest version
- NPM or YARN 
- npm install gulp -g

>= @angular v4.0.0`
>=Typescript v2.1.6` (Recommended 2.3.4)

## Installation
```
# clone the repo
git clone https://github.com/backand/fnhub-web.git
cd fnhub-web

# use npm (or yarn) to install the dependencies
npm install

# dev build
npm run build:spa-dev
# prod build
npm run build:spa-prod

# start the server
npm run serve:spa
# start the server - Development Mode - Keep watching on file change and trigger build
npm run serve:spa-hmr

> Server Side Rendering

# dev build
npm run build:universal-dev
# prod build
npm run build:universal-prod

# start the server (Server Side Rendering)
npm run serve
```

# Client Side Rendering 
http://localhost:1337

# Server Side Rendering 
http://localhost:8000


# warning/ Issues
>(node:35438) DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.
https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/494