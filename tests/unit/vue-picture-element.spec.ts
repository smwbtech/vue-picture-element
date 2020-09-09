import { shallowMount, Wrapper } from '@vue/test-utils'
import VuePictureElement from '@/components/VuePictureElement'

const settings = {
  large: {
    media: { 'max-width': '200px', orientation: 'landscape' },
    delimeters: ['2x', '3x']
  },
  small: {
    media: { 'min-width': '300px', orientation: 'portrait' },
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

  describe('Testing rendering with settings', () => {
    it('Should render picture element', () => {
      expect(cmp.is('picture')).toBeTruthy()
    })

    describe('Testing sourset for "large" image', () => {
      let sourceElWebp: Wrapper<Vue>
      let sourceElPng: Wrapper<Vue>
      let sourceElJpg: Wrapper<Vue>

      beforeEach(() => {
        sourceElWebp = cmp.find('source[srcset*="/img/image-large@2x.webp 2x"]')
        sourceElPng = cmp.find('source[srcset*="/img/image-large@2x.png 2x"]')
        sourceElJpg = cmp.find('source[srcset*="/img/image-large@2x.jpg 2x"]')
      })

      it('Should exists', () => {
        expect(sourceElWebp.exists()).toBeTruthy()
        expect(sourceElPng.exists()).toBeTruthy()
        expect(sourceElJpg.exists()).toBeTruthy()
      })

      it('Should have srcset eq "/img/image-large@2x.[ext] 2x, /img/image-large@3x.[ext] 3x"', () => {
        expect(sourceElWebp.attributes('srcset')).toEqual(
          '/img/image-large@2x.webp 2x, /img/image-large@3x.webp 3x'
        )
        expect(sourceElPng.attributes('srcset')).toEqual(
          '/img/image-large@2x.png 2x, /img/image-large@3x.png 3x'
        )
        expect(sourceElJpg.attributes('srcset')).toEqual(
          '/img/image-large@2x.jpg 2x, /img/image-large@3x.jpg 3x'
        )
      })

      it('Should have media attribute eq "(max-width: 200px) and (orientation: landscape)"', () => {
        expect(sourceElWebp.attributes('media')).toEqual(
          '(max-width: 200px) and (orientation: landscape)'
        )
        expect(sourceElPng.attributes('media')).toEqual(
          '(max-width: 200px) and (orientation: landscape)'
        )
        expect(sourceElJpg.attributes('media')).toEqual(
          '(max-width: 200px) and (orientation: landscape)'
        )
      })
    })

    describe('Testing "small" image', () => {
      let sourceElWebp: Wrapper<Vue>
      let sourceElPng: Wrapper<Vue>
      let sourceElJpg: Wrapper<Vue>

      beforeEach(() => {
        sourceElWebp = cmp.find(
          'source[srcset*="/img/image-small-400.webp 400w"]'
        )
        sourceElPng = cmp.find(
          'source[srcset*="/img/image-small-400.png 400w"]'
        )
        sourceElJpg = cmp.find(
          'source[srcset*="/img/image-small-400.jpg 400w"]'
        )
      })

      it('Should have srcset eq "/img/image-small.[ext], /img/image-small-200.[ext] 200w, /img/image-small-400.[ext] 400w"', () => {
        expect(sourceElWebp.attributes('srcset')).toEqual(
          '/img/image-small.webp, /img/image-small-200.webp 200w, /img/image-small-400.webp 400w'
        )
        expect(sourceElPng.attributes('srcset')).toEqual(
          '/img/image-small.png, /img/image-small-200.png 200w, /img/image-small-400.png 400w'
        )
        expect(sourceElJpg.attributes('srcset')).toEqual(
          '/img/image-small.jpg, /img/image-small-200.jpg 200w, /img/image-small-400.jpg 400w'
        )
      })

      it('Should have media attribute eq "(min-width: 300px) and (orientation: portrait)"', () => {
        expect(sourceElWebp.attributes('media')).toEqual(
          '(min-width: 300px) and (orientation: portrait)'
        )
        expect(sourceElPng.attributes('media')).toEqual(
          '(min-width: 300px) and (orientation: portrait)'
        )
        expect(sourceElJpg.attributes('media')).toEqual(
          '(min-width: 300px) and (orientation: portrait)'
        )
      })
    })

    describe('Testing rendering for "custom_size" image', () => {
      let sourceElWebp: Wrapper<Vue>
      let sourceElPng: Wrapper<Vue>
      let sourceElJpg: Wrapper<Vue>

      beforeEach(() => {
        sourceElWebp = cmp.find(
          'source[srcset*="/img/image-custom_size-100.webp 100w"]'
        )
        sourceElPng = cmp.find(
          'source[srcset*="/img/image-custom_size-100.png 100w"]'
        )
        sourceElJpg = cmp.find(
          'source[srcset*="/img/image-custom_size-100.jpg 100w"]'
        )
      })

      it('Should render only png image', () => {
        expect(sourceElWebp.exists()).toBeFalsy()
        expect(sourceElJpg.exists()).toBeFalsy()
        expect(sourceElPng.exists()).toBeTruthy()
      })

      it('Should have srcset eq "/img/image-custom_size.png, /img/image-custom_size-100.png 100w, /img/image-custom_size-300.png 300w"', () => {
        expect(sourceElPng.attributes('srcset')).toEqual(
          '/img/image-custom_size.png, /img/image-custom_size-100.png 100w, /img/image-custom_size-300.png 300w'
        )
      })

      it('Should have "size" attribute eq to "(max-width: 300px) 50em, 40em, (min-width: 20px) 10vw', () => {
        expect(sourceElPng.attributes('size')).toEqual(
          '(max-width: 300px) 50em, 40em, (min-width: 20px) 10vw'
        )
      })
    })
  })

  describe('Testing rendering without settings', () => {
    let sourceElWebp: Wrapper<Vue>
    let sourceElPng: Wrapper<Vue>
    let sourceElJpg: Wrapper<Vue>

    beforeEach(() => {
      cmp = shallowMount(VuePictureElement, {
        propsData: {
          alt: 'Some alt text',
          extensions: ['webp', 'png', 'jpg'],
          path: '/img',
          name: 'image'
        }
      })

      sourceElWebp = cmp.find('source[srcset*="/img/image.webp"]')
      sourceElPng = cmp.find('source[srcset*="/img/image.png"]')
      sourceElJpg = cmp.find('source[srcset*="/img/image.jpg"]')
    })

    it('Should have srcset eq "/img/image.[ext]"', () => {
      expect(sourceElWebp.attributes('srcset')).toEqual('/img/image.webp')
      expect(sourceElPng.attributes('srcset')).toEqual('/img/image.png')
      expect(sourceElJpg.attributes('srcset')).toEqual('/img/image.jpg')
    })
  })
})
