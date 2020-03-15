# Introduction
## About this plugin
This plugin adds a directive which can be used to create groups of (individual) letters using `span` or tag of your choice.

Inspired by [Lettering.js](https://github.com/davatron5000/Lettering.js).
### What it does
Add the `v-lettering` directive to your element.
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

## Features
Some of the features includes:

- Supports nested splits<br>
- Typescript ready<br>
- SSR ready<br>

## Options
The plugin provides many options to help your customize the behavior of the injection.<br>
[Click here](./OPTIONS.md) to read more about the available options.

## Accessibility
This plugin adds `aria-label` and `aria-hidden` to the injected elements to make them accessibile by default to users with screenreaders. Read more [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

## Issues
If you have any feedback or suggestions, please feel free to write an [issue](https://github.com/miii/vue-lettering/issues) or [PR](https://github.com/miii/vue-lettering/pulls).
