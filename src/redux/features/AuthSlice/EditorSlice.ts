import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { HYDRATE } from 'next-redux-wrapper'
import client from '@/apollo'
import { gql } from '@apollo/client'

const hydrate = createAction<RootState>(HYDRATE)

type TUnknownObject = Record<string, string | number | string | Array<TUnknownObject>>

type EditorState = {
  query: string
  data: TUnknownObject
}

export const CHARACTERS_QUERY = `
  query getCharacters {
    characters {
      results {
        name
      }
    }
  }
`

const initialState: EditorState = {
  query: CHARACTERS_QUERY,
  data: {},
}

export const getGqlValueThunk = createAsyncThunk('editor/getGqlQuery', async (_, api) => {
  const { query } = (api.getState() as RootState).editorSlice
  const response = await client.query({
    query: gql`
      ${query}
    `,
  })

  return response.data
})

export const editorSlice = createSlice({
  name: 'editorSlice',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.editorSlice,
      }
    }),
      builder.addCase(getGqlValueThunk.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
})

export const { setQuery } = editorSlice.actions
export default editorSlice.reducer

export const selectQuery = (state: RootState) => state.editorSlice.query
export const selectEditorData = (state: RootState) => state.editorSlice.data
