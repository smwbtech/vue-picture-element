# vue-picture-element

[![vue](https://img.shields.io/badge/Vue-2.x-green.svg)](https://vuejs.org/index.html)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/smwbtech/vue-picture-element/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/smwbtech/vue-picture-element.svg?branch=master)](https://travis-ci.org/smwbtech/vue-picture-element)
[![Coverage Status](https://coveralls.io/repos/github/smwbtech/vue-picture-element/badge.svg?branch=master)](https://coveralls.io/github/smwbtech/vue-picture-element?branch=master)
[![Size](https://badgen.net/bundlephobia/minzip/vue-picture-element@latest)](https://bundlephobia.com/result?p=vue-picture-element@latest)

vue-picture-element is a component to render flexible images. It based on the `<picture>` HTML element, and provides all possibilities that has origin, but automates some functionality.

- [Installation](#installation)
- [Props](#props)
- [Settings object](#settings-object)
  - [Base example](#base-example)
  - [Width and pixel ratio delimiters](#width-and-pixel-ratio-delimiters)
    - [Width delimiters](#width-delimiters)
    - [Pixel ratio delimiters](#pixel-ratio-delimiters)
    - [Empty delimeter](#empty-delimeter)
  - [Optional label](#optional-label)
- [Available extensions](#available-extensions)

## Installation

```
npm install vue-picture-element
```

Import the component and register it locally:

```javascript
import VuePictureElement from 'vue-picture-element'
export default {
  components: {
    VuePictureElement
  }
}
```

Or, you can register the component globally in your app's entry point (commonly `main.js`, or whatever you named your entry point).

```javascript
import Vue from 'vue'
import VuePictureElement from 'vue-picture-element'
Vue.component('vue-picture-element', VuePictureElement)
```

## Props

**required**  
_optional_

| Property       | Type     | Default | Description                                                                                           |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| **extensions** | string[] | -       | Array of extensions (for example: `['webp','png','jpg']`) [available extensions](#available-extensions) |
| **path**       | string   | `'/'`   | Path to folder with images (for example: `'/images'`)                                                  |
| **name**       | string   | -       | Base name for image                                                                                   |
| _settings_     | object   | -       | Settings for image ([more info with examples](#settings-object))                                     |

## Settings object

The Settings object should implement following interface:

```javascript
{
    label: {
        /* All available media queries. Used for the `media` attribute. */
        media: { 'max-width': '1200px', orientation: 'landscape' },
        
        /* Delimeters for width or pixel-ratio. Don't mix them! The next line is for width. */
        delimeters: ['320w', '480w', '800w'], 
        // (Or, for pixel ratio, use `['2x', '3x']`)
        
        /* Used for the `size` attribute. */
        size: [
            [{ 'max-width': '320px' }, '280px'],
            [{ 'max-width': '480px' }, '440px']
            ['800px'],
        ],
        
        /* If you want a Settings object to apply only to certain image formats, pass a regexp with it */
        test: /png/
    }
}
```

### Base example

Let's use the example from above:

```html
<template>
     <VuePictureElement
      alt="Some picture"
      :extensions="['webp', 'png']"
      :path="'/img'"
      :name="'image'"
      :settings="settings"
    />
</template>
```

```javascript
export default {
  data() {
    return {
      settings: {
        label: {
          /* all fields from above-stated example */
        }
      }
    }
  }
}
```

This will render the following HTML:

**result HTML**

```html
<picture>
  <source src="/img/image.webp" type="image/webp" />
  <source
    srcset="
      /img/image-label-320.png 320w,
      /img/image-label-480.png 480w,
      /img/image-label-800.png 800w
    "
    media="(max-width: 1200px) and (orientation: landscape)"
    type="image/png"
    size="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
  />
  <img alt="Some picture" src="/img/image.png" />
</picture>
```

### Width and pixel ratio delimiters

Don't mix both types.  

#### Width delimiters

```javascript
{
  label: {
    delimeters: ['200w', '400w']
  }
}
```

**result HTML**

```html
<picture>
  <source
    src="/img/image-label-200.webp 200w, /img/image-label-400.webp 400w"
    type="image/webp"
  />
  <source
    src="/img/image-label-200.png 200w, /img/image-label-400.png 400w"
    type="image/png"
  />
  <img alt="Some picture" src="/img/image.png" />
</picture>
```

#### Pixel ratio delimiters

```javascript
{
  label: {
    delimeters: ['2x', '3x']
  }
}
```

**result HTML**

```html
<picture>
  <source
    src="/img/image-label@2x.webp 2x, /img/image-label@3x.webp 3x"
    type="image/webp"
  />
  <source
    src="/img/image-label@2x.png 2x, /img/image-label@3x.png 3x"
    type="image/png"
  />
  <img alt="Some picture" src="/img/image.png" />
</picture>
```

#### Empty delimeter

If you want the `srcset` attribute to include an image path without any delimeters, just pass an empty string.

```javascript
{
  label: {
    delimeters: ['', '2x', '3x']
  }
}
```

**result HTML**

```html
<picture>
  <source
    src="/img/image-label.webp, /img/image-label@2x.webp 2x, /img/image-label@3x.webp 3x"
    type="image/webp"
  />
  <source
    src="/img/image-label.png, /img/image-label@2x.png 2x, /img/image-label@3x.png 3x"
    type="image/png"
  />
  <img alt="Some picture" src="/img/image.png" />
</picture>
```

### Optional label

If you don't want the label to be part of the image's path, just prefix it with `$`.

```javascript
{
  $label: {
    delimeters: ['', '2x', '3x']
  }
}
```

**result HTML**

```html
<picture>
  <source
    src="/img/image.webp, /img/image@2x.webp 2x, /img/image@3x.webp 3x"
    type="image/webp"
  />
  <source
    src="/img/image.png, /img/image@2x.png 2x, /img/image@3x.png 3x"
    type="image/png"
  />
  <img alt="Some picture" src="/img/image.png" />
</picture>
```

## Available extensions

The `type` attribute is assigned automatically based on the image extension.

| Extension | Type          |
| --------- | ------------- |
| apng      | image/apng    |
| bmp       | image/bmp     |
| gif       | image/gif     |
| cur       | image/x-icon  |
| ico       | image/x-icon  |
| jpg       | image/jpeg    |
| jpeg      | image/jpeg    |
| jpeg      | image/jpeg    |
| jfif      | image/jpeg    |
| pjpeg     | image/jpeg    |
| pjp       | image/jpeg    |
| png       | image/png     |
| svg       | image/svg+xml |
| tif       | image/tiff    |
| tiff      | image/tiff    |
| webp      | image/webp    |

## LICENSE

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
