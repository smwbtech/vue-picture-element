import queryToString from './query-to-string'

export default function(sizes: SizeType | undefined) {
  if (!sizes) return ''
  return sizes
    .map(size => {
      return size
        .map(v => {
          if (typeof v === 'object') return queryToString(v)
          return v
        })
        .join(' ')
    })
    .join(', ')
}
