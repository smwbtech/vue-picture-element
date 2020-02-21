import { Settings, SettingItem } from 'vue-picture-element'
import { VNode, CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import queryToString from '@/assets/helpers/query-to-string'
import generateSrcset from '@/assets/helpers/srcset-generator'

enum Extansions {
  apng = 'image/apng',
  bmp = 'image/bmp',
  gif = 'image/gif',
  cur = 'image/x-icon',
  ico = 'image/x-icon',
  jpg = 'image/jpeg',
  jpeg = 'image/jpeg',
  jfif = 'image/jpeg',
  pjpeg = 'image/jpeg',
  pjp = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  tif = 'image/tiff',
  tiff = 'image/tiff',
  webp = 'image/webp'
}

type AvailableTypes = keyof typeof Extansions

@Component
export default class VuePictureElement extends Vue {
  @Prop({
    type: Array,
    required: true,
    validator: (val: string[]) => val.every((ext: string) => ext in Extansions)
  })
  readonly extensions!: AvailableTypes[]

  @Prop({ required: true, default: '/' }) readonly path!: string

  @Prop({ required: true }) readonly name!: string

  @Prop() readonly settings?: Settings

  render(h: CreateElement): VNode {
    const sources = this.$props.extensions.map((ext: AvailableTypes) => {
      // If user pass settings object
      if (this.$props.settings) {
        for (const [label, options] of Object.entries(
          this.$props.settings as SettingItem
        )) {
          return h('source', {
            attrs: {
              srcset: generateSrcset(
                this.$props.path,
                this.$props.name,
                label,
                ext,
                options.xDelimetrs
              ),
              media: queryToString(options.media),
              type: Extansions[ext]
            }
          })
        }
      } else {
        return h('source', {
          attrs: {
            src: `${this.$props.path}/${this.$props.name}.${ext}`,
            type: Extansions[ext]
          }
        })
      }
    })
    return h('picture', {}, [sources])
  }
}
