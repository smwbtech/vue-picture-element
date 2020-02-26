export default function(queries: MediaQuery | undefined): string {
  if (queries === undefined) return ''
  return Object.entries(queries)
    .map(q => `(${q[0]}: ${q[1]})`)
    .join(' and ')
}
