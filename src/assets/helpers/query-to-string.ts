import { MediaQuery } from 'vue-picture-element'

export default function (queries: MediaQuery) {
  return Object.values(queries)
    .toString()
    .replace(/,/, ',')
}
