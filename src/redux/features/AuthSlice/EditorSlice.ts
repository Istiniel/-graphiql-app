import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { HYDRATE } from 'next-redux-wrapper'
import client from '@/apollo'
import { gql } from '@apollo/client'

const hydrate = createAction<RootState>(HYDRATE)

type TUnknownObject = Record<string, string | number | string | Array<TUnknownObject>> | string

export const CHARACTERS_QUERY = `
query getCharacters($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      name
      status
    }
  }
}
`

export const CHARACTERS_VARS = `{
  "filter": {
    "status": "Alive"
  }
}
`

export const CHARACTERS_HEADERS = `{
  "special": "Special header value"
}
`

type EditorState = {
  query: string
  variables: string
  headers: string
  data: TUnknownObject
  status: 'idle' | 'loading'
  error: null | SerializedError
}

const initialState: EditorState = {
  query: CHARACTERS_QUERY,
  variables: CHARACTERS_VARS,
  headers: CHARACTERS_HEADERS,
  data: {},
  status: 'idle',
  error: null,
}

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

export const editorSlice = createSlice({
  name: 'editorSlice',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.editorSlice,
        }
      })
      .addCase(getGqlValueThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getGqlValueThunk.fulfilled, (state, action) => {
        state.data = action.payload
        console.log(action.payload)
        state.status = 'idle'
      })
      .addCase(getGqlValueThunk.rejected, (state, action) => {
        state.status = 'idle'
        state.data = {
          error: action.error.name || 'unknown error',
          message: action.error.message || 'unknown',
        }
      })
  },
})

export const { setQuery, setVariables, setHeaders } = editorSlice.actions
export default editorSlice.reducer

export const selectQuery = (state: RootState) => state.editorSlice.query
export const selectStatus = (state: RootState) => state.editorSlice.status
export const selectEditorData = (state: RootState) => state.editorSlice.data
