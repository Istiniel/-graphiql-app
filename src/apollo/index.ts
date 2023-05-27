import { DEFAULT_GRAPH_QL_API } from '@/constants/common'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.GRAPH_QL_API ?? DEFAULT_GRAPH_QL_API,
  cache: new InMemoryCache(),
})

export default client
