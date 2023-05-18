import { ApolloClient, InMemoryCache } from '@apollo/client'

//TODO move it to .env ?
const GQL_API = 'https://rickandmortyapi.com/graphql'

const client = new ApolloClient({
  uri: GQL_API,
  cache: new InMemoryCache(),
})

export default client
