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
Add the following to your `etc/hosts`

```
172.17.0.1       inowas.local
```

Start development server:

```
$ docker run --rm -it -p 8080:8080 -p 3000:3000 --volume $(pwd):/app sandrokeil/typescript yarn run dev
```

Open your browser with [http://inowas.local:8080](http://inowas.local:8080).
