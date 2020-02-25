<template>
  <div id="app">
    <VuePictureElement
      :extensions="['png', 'jpg']"
      :path="'/img'"
      :name="'image'"
      :settings="settings"
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
        $regular: {
          test: /jpg/
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
