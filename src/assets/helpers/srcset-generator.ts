import { AvailableTypes } from 'vue-picture-element'

export default function (
  path: string,
  name: string,
  label: string,
  type: AvailableTypes,
  xDelimentrs: string[]
): string {
  const baseStr = `${path}/${name}-${label}`
  const srcsetArray = [`${baseStr}.${type}`]
  xDelimentrs.forEach(delimetr =>
    srcsetArray.push(`${baseStr}@${delimetr}.${type} ${delimetr}`)
  )
  return srcsetArray.join(',')
}
