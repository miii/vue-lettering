# @miii/vue-lettering
Web Typography tool for Vue to split text into pieces for CSS selection with ease.<br>
Typescript ready. Inspired by [Lettering.js](davatron5000/Lettering.js).


The plugin adds a `v-lettering` directive which can be used to create groups of (individual) letters using `span` or tag of your choice.

It even <strong>supports nested splits</strong>.

<img src="https://user-images.githubusercontent.com/158975/76612092-e9d82380-651b-11ea-8400-7eb7031cfd8c.png" width="500">

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

Will output:
```html
<h1 aria-label="Foo">
  <span class="vl__g vl--i-1" aria-hidden="true">F</span>
  <span class="vl__g vl--i-2" aria-hidden="true">o</span>
  <span class="vl__g vl--i-3" aria-hidden="true">o</span>
</h1>
```

## ⚙️  Options
The plugin provides many options to help your customize the behavior of the injection.<br>
[Click here](./OPTIONS.md) to read more about the available options.

## 🔉  Accessibility
This plugin adds `aria-label` and `aria-hidden` to the injected elements to make them accessibile by default to users with screenreaders. Read more [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

## ❗️ Issues
If you have any feedback or suggestions, I'd love if you wrote an issue about it.
