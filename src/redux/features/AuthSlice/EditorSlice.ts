import {
  createAction,
  SerializedError,
  createSlice,
  PayloadAction,
  current,
} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { HYDRATE } from 'next-redux-wrapper'
import { getGqlDocsThunk, getGqlValueThunk } from '@/redux/asyncThunks/editorThunks'
import { DEFAULT_CHARACTERS } from '@/constants/editor'
import EditorService, { DocTreeNode } from '@/services/EditorService'

const hydrate = createAction<RootState>(HYDRATE)

type TUnknownObject = Record<string, string | number | string | Array<TUnknownObject>> | string

enum EditorStatus {
  IDLE = 'idle',
  LOADING = 'loading',
}

type EditorState = {
  query: string
  variables: string
  headers: string
  data: TUnknownObject
  status: EditorStatus
  error: null | SerializedError
  docTree: DocTreeNode | null
}

const initialState: EditorState = {
  query: DEFAULT_CHARACTERS.QUERY,
  variables: DEFAULT_CHARACTERS.VARS,
  headers: DEFAULT_CHARACTERS.HEADERS,
  data: {},
  status: EditorStatus.IDLE,
  error: null,
  docTree: null,
}

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
    toggleDocTreeExpanded: (state, action: PayloadAction<string>) => {
      state.docTree = EditorService.toggleDocTreeExpanded(current(state.docTree), action.payload)
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
        state.status = EditorStatus.LOADING
      })
      .addCase(getGqlValueThunk.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = EditorStatus.IDLE
      })
      .addCase(getGqlValueThunk.rejected, (state, action) => {
        state.status = EditorStatus.IDLE
        state.data = {
          error: action.error.name || 'unknown error',
          message: action.error.message || 'unknown',
        }
      })
      .addCase(getGqlDocsThunk.fulfilled, (state, action) => {
        state.docTree = action.payload
      })
  },
})

export const { setQuery, setVariables, setHeaders, toggleDocTreeExpanded } = editorSlice.actions
export default editorSlice.reducer

export const selectQuery = (state: RootState) => state.editorSlice.query
export const selectStatus = (state: RootState) => state.editorSlice.status
export const selectEditorData = (state: RootState) => state.editorSlice.data
