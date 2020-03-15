# Introduction
## About this plugin
This plugin adds a directive which can be used to create groups of (individual) letters using `span` or tag of your choice.

Inspired by [Lettering.js](https://github.com/davatron5000/Lettering.js).
### What it does
Add the `v-lettering` directive to your element.
```html
<h1 v-lettering>Foo</h1>
```

The plugin will render the following output:
```html
<h1 aria-label="Foo">
  <span class="vl__g vl--i-1" aria-hidden="true">F</span>
  <span class="vl__g vl--i-2" aria-hidden="true">o</span>
  <span class="vl__g vl--i-3" aria-hidden="true">o</span>
</h1>
```

## Features
Some of the features includes:

- Supports nested splits<br>
- Typescript ready<br>
- SSR ready<br>

## 🔉  Accessibility
This plugin uses the [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) guidelines on the injected elements to make them accessibile to users with screenreaders.

## Issues
If you have any feedback or suggestions, please feel free to write an [issue](https://github.com/miii/vue-lettering/issues) or [PR](https://github.com/miii/vue-lettering/pulls).
