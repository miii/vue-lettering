# Installation

## Direct Download / CDN

https://unpkg.com/vue-lettering/dist/vue-lettering 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-lettering@{{ $version }}/dist/vue-lettering.js
 
Include vue-lettering after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-lettering/dist/vue-lettering.js"></script>
```

## NPM

```sh
$ npm install vue-lettering
```

## Yarn

```sh
$ yarn add vue-lettering
```

When used with a module system, you must explicitly install the `vue-lettering` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue-lettering from 'vue-lettering'

Vue.use(vue-lettering)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vue-lettering` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//vue-lettering.git node_modules/vue-lettering
$ cd node_modules/vue-lettering
$ npm install
$ npm run build
```

