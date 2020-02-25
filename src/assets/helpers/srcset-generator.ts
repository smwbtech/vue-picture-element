import { AvailableTypes } from '@/types/image-types'

function getDelimetrType(delimeters: string[]): DelimeterType {
  if (!delimeters || delimeters.length === 0) return

  const notEmptyDelimeter = delimeters.find(v => v.length > 0)
  const notEmptyDelimeterType = notEmptyDelimeter?.slice(-1)
  const isСonsistent = delimeters.every(delimeter => {
    return delimeter
      ? delimeter.slice(-1) === notEmptyDelimeter?.slice(-1)
      : true
  })
  if (
    (isСonsistent && notEmptyDelimeterType === 'w') ||
    notEmptyDelimeterType === 'x'
  ) {
    return notEmptyDelimeterType
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `Incorect delimeter: [${delimeters.join(
        ', '
      )}]. Delimetrs should be equal to "", "***w", "*x", where * is number`
    )
  }
}

export default function(
  path: string,
  name: string,
  label: string,
  type: AvailableTypes,
  delimeters: string[]
): string {
  const baseStr =
    label[0] === '$' ? `${path}/${name}` : `${path}/${name}-${label}`
  const srcsetArray: string[] = []
  const delimeterType = getDelimetrType(delimeters)
  if (delimeterType === undefined) {
    return `${baseStr}.${type}`
  }
  delimeters.forEach(delimeter => {
    if (delimeter && delimeterType === 'w') {
      const postfix = delimeter.replace('w', '')
      srcsetArray.push(`${baseStr}-${postfix}.${type} ${delimeter}`)
    }

    if (delimeter && delimeterType === 'x') {
      srcsetArray.push(`${baseStr}@${delimeter}.${type} ${delimeter}`)
    }

    if (delimeter.length === 0) {
      srcsetArray.push(`${baseStr}.${type}`)
    }
  })
  return srcsetArray.join(', ')
}
