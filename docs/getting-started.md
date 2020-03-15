# Getting started

## Installation
### Install from NPM
```sh
$ yarn add @miii/vue-lettering
```
```sh
$ npm install @miii/vue-lettering --save
```

Add the plugin to your app:
```js
import Vue from 'vue'
import VueLettering from '@miii/vue-lettering'

Vue.use(VueLettering, {
  // Optional plugin options
})

const app = new Vue({
  // ...
})
```

### Direct Download / CDN
`https://unpkg.com/@miii/vue-lettering/dist/vue-lettering`

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like:<br>
`https://unpkg.com/@miii/vue-lettering@{{ $version }}/dist/vue-lettering.js` 

Include Vue Lettering after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-lettering/dist/vue-lettering.js"></script>
```

## Usage

In your template:
```html
<h1 v-lettering>Foo</h1>
```

Rendered output:
```html
<h1 aria-label="Foo">
  <span class="vl__g vl--i-1" aria-hidden="true">F</span>
  <span class="vl__g vl--i-2" aria-hidden="true">o</span>
  <span class="vl__g vl--i-3" aria-hidden="true">o</span>
</h1>
```

::: tip
Use [custom options](options.html) to customize the behavior of the injection.
:::