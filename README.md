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

| Property       | Type     | Default | Description                                                                                           |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| **extensions** | string[] | -       | Array of extensions, for example \['webp','png','jpg'\] [available extensions](#available-extensions) |
| **path**       | string   | '/'     | Path to folder with images, for example '/images'                                                     |
| **name**       | string   | -       | Base name for image                                                                                   |
| **_settings_** | object   | -       | Settings for image [more info with examples](#settings-object)                                        |

## Settings object

Settings object should implements following interface

```javascript
{
    label: {
        /* All available media queries. Will form media attribute*/
        media: { 'max-width': '200px', orientation: 'landscape' },
        /* Delimetrs for width or pixel ratio*/
        delimeters: ['200w', '400w'],
        /* Will form size attribute */
        size: [
            [{ 'max-width': '300px' }, '50em'],
            ['40em'],
            [{ 'min-width': '20px' }, '10vw']
        ],
        /* If you want to implement this settings only for particular image format, pass regexp with it*/
        test: /png/
    }
}
```

## Available extensions

Type attribute will be assigned automatically based on extension of image

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
