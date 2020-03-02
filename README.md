# vue-picture-element

vue-picture-element is a component to render flexible images. It based on picture html element and provide all possibilities that has origin, but automatize some functionality

## Installation

```
npm install vue-picture-element
```

Import component and register it locally

```javascript
import VueTextTransition from 'vue-picture-element'
export default {
  components: {
    VuePictureElement
  }
}
```

Or register the component globally in your app entry point (main.js or as you called it)

```javascript
import Vue from 'vue'
import VuePictureElement from 'vue-picture-element'
Vue.component('vue-picture-element', VuePictureElement)
```

## Props

| Property       | Type     | Default | Description                                                                                         |
| -------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| **extensions** | String[] | -       | Array of extensions, for example ['webp','png','jpg'] (available extensions)[#available-extensions] |

## Available extensions

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
