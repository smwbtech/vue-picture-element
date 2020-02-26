import { shallowMount, Wrapper } from '@vue/test-utils'
import VuePictureElement from '@/components/VuePictureElement'

const settings = {
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
}

describe('Testing VuePictureElement.ts', () => {
  let cmp: Wrapper<VuePictureElement>

  beforeEach(() => {
    cmp = shallowMount(VuePictureElement, {
      propsData: {
        alt: 'Some alt text',
        extensions: ['webp', 'png', 'jpg'],
        path: '/img',
        name: 'image',
        settings
      }
    })
  })

  it('VuePictureElement should exist', () => {
    expect(expect(cmp.exists()).toBeTruthy())
  })

  it('VuePictureElement should be VueInstance', () => {
    expect(cmp.isVueInstance()).toBeTruthy()
  })
})
