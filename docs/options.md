---
sidebarDepth: 2
---

# Options
Vue Lettering provides many options to help your customize the behavior of the injection.

## Global or local options
All properties can be set globally or on single elements.

Example with options applied globally to affect all elements:
```js
import Vue from 'vue'
import VueLettering from '@miii/vue-lettering'

Vue.use(VueLettering, {
  tagName: 'a',
  // Other global plugin options...
})
```

Example with option set on specific element:
```html
<h1 v-lettering="{ tagName: 'a' }">Foo</h1>
```

::: warning
Local options will override equivalent global options.
:::

### Nuxt module options
To apply global plugin options when using the Nuxt module, just add them to your config.
```js{7-9}
// nuxt.config.js
module.exports = {
  modules: [
    '@miii/vue-lettering/nuxt',
  ],

  lettering: {
    // Global plugin options
  }
}
```

If you wish to set your options inline instead, that is supported as well.
```js
// nuxt.config.js
module.exports = {
  modules: [
    ['@miii/vue-lettering/nuxt', { /* Plugin options */ }]
  ],
}
```

## Options
### `tagName`
#### Use custom tag
> **Type:** `string`<br>
> **Default value:** `'span'`

Use modifier or `tagName` option to customize injected tag name.
```html
<h1 v-lettering.a>Foo</h1>
<!-- or -->
<h1 v-lettering="{ tagName: 'a' }">Foo</h1>
```

Will output:
```html
<h1 aria-label="Foo">
  <a class="vl__g vl--i-1" aria-hidden="true">F</a>
  <!-- ... -->
</h1>
```

### `splits`
#### Set custom splits
> **Type:** `string | Regexp | (string | Regexp)[]`<br>
> **Default value:** `''`

By default the plugin will split every character into a group, but you can easily customize this to create multiple splits and nested groups. The plugin will run a recursive [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).

```html
<!-- First split words, then split characters -->
<h1 v-lettering="{ splits: [' ', ''] }">Do it</h1>

<!-- Alternative syntax -->
<h1 v-lettering="[' ', '']">Do it</h1>
```

Will output:
```html
<h1 aria-label="Do it">

  <!-- "Do" group -->
  <span
    class="vl__g vl--lvl-1 vl--i-1"
    aria-hidden="true"
  >
    <span class="vl__g vl--lvl-2 vl--i-1">D</span>
    <span class="vl__g vl--lvl-2 vl--i-2">o</span>
  </span>

  <!-- "it" group -->
  <span
    class="vl__g vl--lvl-1 vl--i-2"
    aria-hidden="true"
  >
    <span class="vl__g vl--lvl-2 vl--i-1">i</span>
    <span class="vl__g vl--lvl-2 vl--i-2">t</span>
  </span>

</h1>
```
Example CSS selections:
```css
/* Make "it" word red */
.vl__g.vl--lvl-1.vl--i-2 {
  /* Level: 1 */
  /* Index: 2 */
  color: red;
}
```
```css
/* Uppercase every odd character */
.vl__g.vl--lvl-2:nth-child(2n + 1) {
  /* Level: 2 */
  /* Index: 1, 3, 5... */
  text-transform: uppercase;
}
```

> **Note:**<br>The `vl--lvl-<x>` class will be injected automatically if multiple splits are provided. This can be turned off using the [`classNameInjection.level`](#classnameinjection) option.

### `char`
#### Modify leaf characters/strings
> <strong>Type:</strong> `(char: string) => string`<br>
> <strong>Default value:</strong> `(text) => text.replace(' ', '&nbsp;'),`

Customize leaf characters/strings before added to element.

```html
<h1 v-lettering="{ char: (t) => t.toUpperCase() }">Foo</h1>
```

Will output:
```html
<h1 aria-label="Foo">
  <span class="vl__g vl--i-1" aria-hidden="true">F</span>
  <span class="vl__g vl--i-2" aria-hidden="true">O</span>
  <span class="vl__g vl--i-3" aria-hidden="true">O</span>
</h1>
```

### `className`
#### Add custom class names
> **Type:**<br>`string | (index: number, level: number, char: string) => string`

Add custom class names to injected groups.
```html
<h1
  v-lettering="{
    className: (i, l, c) => `char-${c}`
  }"
>
  Foo
</h1>
```

Will output:
```html
<h1 aria-label="Foo">
  <span class="vl__g vl--i-1 char-F" aria-hidden="true">F</span>
  <span class="vl__g vl--i-2 char-o" aria-hidden="true">o</span>
  <span class="vl__g vl--i-3 char-o" aria-hidden="true">o</span>
</h1>
```

### `classNameInjection`
#### Automatic class name injection
> **Type and default values:**
> ```typescript
> {
>  // Default value: true
>  group: boolean,
>
>  // Default value: true (will only inject if multiple splits)
>  level: boolean,
>
>  // Default value: true
>  index: boolean,
> }
> ```
Allow injection of selector classes.
| Type  | Injected class name |
| ---   | ---                 |
| Group | `.vl__g`            |
| Level | `.vl--lvl-<x>`      |
| Index | `.vl--i-<x>`        |

::: warning
`.vl--i-<x>` and `.vl--lvl-<x>` **always** starts from index 1.
:::

Disable group and index class injection:
```html
<h1
  v-lettering="{
    classNameInjection: {
      group: false,
      index: false
    }
  }"
>
  Foo
</h1>
```

Will output:
```html
<h1 aria-label="Foo">
  <!-- Omit class names -->
  <span aria-hidden="true">F</span>
  <span aria-hidden="true">o</span>
  <span aria-hidden="true">o</span>
</h1>
```

### `beforeAppend`
> **Type**: `(element: HTMLElement, index: number, level: number) => unknown`

Modify element before appending to the DOM tree.
```html
<h1
  v-lettering="{
    beforeAppend: (el, index) => {
      if (index === 2)
        el.dataset.foo = 'bar'
    }
  }"
>
  Foo bar
</h1>
```

Will output:
```html{3}
<h1 aria-label="Foo bar">
  <span aria-hidden="true">F</span>
  <span aria-hidden="true" data-foo="bar">o</span>
  <span aria-hidden="true">o</span>
  <!-- ... -->
</h1>
```