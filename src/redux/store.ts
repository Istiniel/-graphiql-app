import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import AuthSlice from './features/AuthSlice/AuthSlice'
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  authSlice: AuthSlice,
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(setupStore)
