<template>
  <div id="app">
    <VuePictureElement
      alt="Some picture"
      :extensions="['png', 'jpg']"
      :path="'/img'"
      :name="'image'"
      :settings="settings"
    />
    <VuePictureElement
      alt="Some picture"
      :extensions="['webp', 'png']"
      :path="'/img'"
      :name="'image'"
      :settings="settings2"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VuePictureElement from '@/components/VuePictureElement'

@Component({
  components: {
    VuePictureElement
  },

  data() {
    return {
      settings: {
        large: {
          media: { 'max-width': '200px', orientation: 'landscape' },
          delimeters: ['2x', '3x']
        },
        small: {
          media: { 'max-width': '200px', orientation: 'landscape' },
          delimeters: ['', '200w', '400w']
        },
        /* eslint-disable */
        custom_size: {
          media: {
            'max-width': '400px',
            orientation: 'landscape',
            'pixel-ratio': '2x'
          },
          delimeters: ['', '100w', '300w'],
          size: [
            [{ 'max-width': '300px' }, '50em'],
            ['40em'],
            [{ 'min-width': '20px' }, '10vw']
          ],
          test: /png/
        },
        /* eslint-enable */
        $regular: {
          test: /jpg/
        }
      },
      settings2: {
        label: {
          media: { 'max-width': '200px', orientation: 'landscape' },
          delimeters: ['200w', '400w'],
          size: [
            [{ 'max-width': '300px' }, '50em'],
            ['40em'],
            [{ 'min-width': '20px' }, '10vw']
          ],
          test: /png/
        }
      }
    }
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
