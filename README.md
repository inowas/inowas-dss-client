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

## Structure
We use a feature like [module structure](https://www.robinwieruch.de/tips-to-learn-react-redux/#folderOrganization). 
The module and feature `t03` has a complete structure which looks like

```
t03
├── actions
│   ├── actions.js
│   ├── commands.js
│   ├── events.js
│   ├── index.js
│   ├── queries.js
│   └── routing.js
├── components
│   ├── index.js
│   ├── stressPeriodDataTable.jsx
│   ├── stressPeriodProperties.jsx
│   └── ...
├── containers
│   ├── index.js
│   ├── main.jsx
│   ├── modelEditorGeneral.jsx
│   └── ...
├── index.js
├── reducers
│   ├── boundary.js
│   ├── index.js
│   └── model.js
├── sagas
│   ├── getModflowModelDetails.js
│   ├── index.js
│   ├── loadBoundary.js
│   └── ...
└── selectors
    ├── index.js
    ├── mapState.js
    ├── model.js
    └── ...
```

Each folder contains an `index.js` file which exposes the components/functions for external use. The available folders
should be `actions`, `components`, `containers`, `reducers`, `sagas` and `selectors`. The `core` module is similar but has
components in it's root which follows the structure above.

### Folder actions
We have a special separation here to be more like the event sourced backend. Actions (`action.js) triggers only a store change.
Commands `commands.js` sends a request to server and triggers an event. Events (`event.js`) triggers only a store change 
from a successful command. Queries (`queries.js`) send a get/load request to server and triggers an action to set data in store, if needed.
Usually it uses a saga for complex flows like `getModflowDetailsFlow`. Changes or updates for the Browser location are 
located in `routing.js`. A special case is the `callbacks.js` file which manipulates the state of the given component.

### Folder components
In an ideal world, the components folder contains only dump/pure/stateless components. These components are not connected
to the store. To improve performance and avoid useless rendering we use [recompose](https://github.com/acdlite/recompose).

### Folder containers
Containers are connected to the store and dispatches actions. In an ideal world, containers contains no layout and 
provides only props for the components. To improve performance we use [reselect](https://github.com/reactjs/reselect).
Please consider also [React is Slow, React is Fast](https://marmelab.com/blog/2017/02/06/react-is-slow-react-is-fast.html).

### Folder reducers
[Redux](http://redux.js.org/) is a predictable state container for JavaScript apps. Each module like `t03` has a main
reducer which is commonly used with `combineReducers()`. The reducers applies state changes from actions to the Redux store.

### Folder selectors
[Selectors](https://github.com/markerikson/react-redux-links/blob/master/redux-reducers-selectors.md#selectors-and-normalization)
are functions to retrieve state from the store. They are composeable and you can compute derived data. A special file is
`mapState.js` which contains the `mapStateToProps` functions (which uses reselect) for containers.

### Folder sagas
[Redux Saga](https://github.com/redux-saga/redux-saga) is a library that aims to make application side effects 
(i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, 
more efficient to execute, simple to test, and better at handling failures.

## Links

- [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)
- [Higher Order Components (HOCs)](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)
- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) 
