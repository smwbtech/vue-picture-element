import { Extansions, AvailableTypes } from '@/types/image-types'
import { VNode, CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import queryToString from '@/assets/helpers/query-to-string'
import generateSrcset from '@/assets/helpers/srcset-generator'
import sizeToString from '@/assets/helpers/size-generator'

@Component
export default class VuePictureElement extends Vue {
  @Prop({ type: String, default: '' }) readonly alt?: string

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
    const sources: VNode[] = []
    const img = h('img', {
      attrs: {
        alt: this.$props.alt,
        src: `${this.$props.path}/${this.$props.name}.${
          this.$props.extensions[this.$props.extensions.length - 1]
        }`
      },
      on: {
        load: (e: Event) => this.$emit('image-loaded', e)
      }
    })
    this.$props.extensions.forEach((ext: AvailableTypes) => {
      // If user pass settings object
      if (this.$props.settings) {
        for (const [label, options] of Object.entries(
          this.$props.settings as SettingItem
        )) {
          if (
            !this.$props.settings[label].test ||
            this.$props.settings[label]?.test?.test(ext)
          ) {
            const source = h('source', {
              attrs: {
                srcset: generateSrcset(
                  this.$props.path,
                  this.$props.name,
                  label,
                  ext,
                  options.delimeters
                ),
                media: queryToString(options.media),
                type: Extansions[ext],
                size: sizeToString(options.size)
              }
            })
            sources.push(source)
          } else {
            const source = h('source', {
              attrs: {
                srcset: `${this.$props.path}/${this.$props.name}.${ext}`,
                type: Extansions[ext]
              }
            })
            sources.push(source)
          }
        }
      } else {
        const source = h('source', {
          attrs: {
            src: `${this.$props.path}/${this.$props.name}.${ext}`,
            type: Extansions[ext]
          }
        })
        sources.push(source)
      }
    })
    return h(
      'picture',
      {
        on: {
          'image-loaded': (e: Event) => this.$emit('image-loaded', e)
        }
      },
      [...sources, img]
    )
  }
}
