import client from '@/apollo'
import { DEFAULT_GRAPH_QL_API } from '@/constants/common'
import EditorService, { DocsResponse } from '@/services/EditorService'
import { gql } from '@apollo/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIntrospectionQuery } from 'graphql'
import ky from 'ky'
import { RootState } from '../store'

export const getGqlValueThunk = createAsyncThunk('editor/getGqlQuery', async (_, thunkAPI) => {
  const { query, variables, headers } = (thunkAPI.getState() as RootState).editorSlice

  const response = await client.query({
    query: gql`
      ${query}
    `,
    variables: JSON.parse(variables),
    context: {
      headers: JSON.parse(headers),
    },
  })

  return response.data
})

export const getGqlDocsThunk = createAsyncThunk('editor/getGqlDocs', async () => {
  const json: DocsResponse = await ky
    .post(process.env.GRAPH_QL_API ?? DEFAULT_GRAPH_QL_API, {
      json: {
        query: getIntrospectionQuery(),
      },
    })
    .json()

  return EditorService.buildDocTree(json)
})
