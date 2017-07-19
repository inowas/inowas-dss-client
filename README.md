# inowas-dss-client

## Setup

* install node.js and yarn
* load dependencies: `yarn install`

## Development

* run dev server: `yarn run dev`
* run eslint: `yarn run lint`
* run tests: `yarn run test`
* update autocompletion for custom components: `yarn run generate`
* add npm package as dev-dependency: `yarn add -D <package name>`
* upgrade dependencies: `yarn upgrade`

## Build

* run build for production: `yarn run build`

### Docker

```
$ docker run --rm -it -p 8080:8080 -p 3000:3000 --volume $(pwd):/app sandrokeil/typescript yarn run dev
```
