export default function(queries: MediaQuery | undefined): string {
  if (queries === undefined) return ''
  return Object.values(queries)
    .toString()
    .replace(/,/, ',')
}
