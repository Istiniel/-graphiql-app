import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { HYDRATE } from 'next-redux-wrapper'
import { User } from 'firebase/auth'
// import { auth } from '@/firebase/clientApp'

const hydrate = createAction<RootState>(HYDRATE)

type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.authSlice,
      }
    })
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.authSlice.user
