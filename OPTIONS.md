## Options
The plugin provides many options to help your customize the behavior of the injection.

<a name="tagName"></a>
### `tagName` - Use custom tag
> <strong>Type:</strong> `string`<br>
> <strong>Default value:</strong> `'span'`

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

### `splits` - Set custom splits
> <strong>Type:</strong> `string | Regexp | (string | Regexp)[]`<br>
> <strong>Default value:</strong> `''`

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
    <span class="vl__g vl--lvl-2 vl--i-1">D</a>
    <span class="vl__g vl--lvl-2 vl--i-2">o</a>
  </span>

  <!-- "it" group -->
  <span
    class="vl__g vl--lvl-1 vl--i-2"
    aria-hidden="true"
  >
    <span class="vl__g vl--lvl-2 vl--i-1">i</a>
    <span class="vl__g vl--lvl-2 vl--i-2">t</a>
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

> <strong>Note:</strong><br>The `vl--lvl-x` class will be injected automatically if multiple splits are enabled.

### `char` - Modify leaf characters/strings
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

### `className` - Add custom class names
> <strong>Type:</strong><br>`string | (index: number, level: number, char: string) => string`<br>
> <strong>Default value:</strong> `''`

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
  <span class="vl__g vl--i-1 char-o" aria-hidden="true">o</span>
  <span class="vl__g vl--i-1 char-o" aria-hidden="true">o</span>
</h1>
```

### `classNameInjection` - Automatic class name injection
> <strong>Type and default values:</strong>
> ```typescript
> {
>  // Default value: true
>  group: boolean,
>
>  // Default value: true (will only inject if nested splits)
>  level: boolean,
>
>  // Default value: true
>  index: boolean,
> }
> ```

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
  <span aria-hidden="true">F</span>
  <span aria-hidden="true">o</span>
  <span aria-hidden="true">o</span>
</h1>
```