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

Build typescript container in docker-inowas-api repository

```
docker build -t inowas/typescript typescript
```

Configure `config.js`

```
export default {
    baseURL: 'http://inowas.local:8002'
};
```

Start development server:

```
$ docker run --rm -it -p 8080:8080 -p 3000:3000 --volume $(pwd):/app inowas/typescript yarn run dev
```

Init database

```
$ docker-compose exec php bash
$ ./build/build.on.docker.sh 
$ ./build/test.on.docker.sh
$ cs inowas:es:migrate 2
$ cs inowas:es:migrate 3
```

Open your browser with [http://inowas.local:8080](http://inowas.local:8080).
