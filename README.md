# @miii/vue-lettering
> Web Typography tool for Vue to split text into pieces for CSS selection with ease.<br>

The plugin adds a `v-lettering` directive which can be used to create groups of (individual) letters using `span` or tag of your choice.

Inspired by [Lettering.js](https://github.com/davatron5000/Lettering.js).


<strong>Typescript ready 🌟</strong><br>
<strong>SSR ready 🌟</strong><br>
<strong>Supports nested splits 🌟</strong>

<img src="https://user-images.githubusercontent.com/158975/76702748-a1ac3300-66cc-11ea-83d1-1bcf6fb24d0b.png" width="600">

## 📦  Install
```sh
$ yarn add @miii/vue-lettering
```

Add to your app:
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

## 🚀  Usage

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

## 🔉  Accessibility
This plugin adds `aria-label` and `aria-hidden` to the injected elements to make them accessibile to users with screenreaders.

## ❗️ Issues
If you have any feedback or suggestions, please feel free to write an issue or PR.
