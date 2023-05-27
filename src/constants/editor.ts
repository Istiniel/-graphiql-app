const DEFAULT_CHARACTERS_QUERY = `
query getCharacters($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      name
      status
    }
  }
}
`

const DEFAULT_CHARACTERS_VARS = `{
  "filter": {
    "status": "Alive"
  }
}
`

const DEFAULT_CHARACTERS_HEADERS = `{
  "special": "Special header value"
}
`
export const DEFAULT_CHARACTERS = {
  QUERY: DEFAULT_CHARACTERS_QUERY,
  VARS: DEFAULT_CHARACTERS_VARS,
  HEADERS: DEFAULT_CHARACTERS_HEADERS,
}
