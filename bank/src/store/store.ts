import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { accountSlice } from "./slice"
import { Repository } from "../core/repository"
import { Presenter } from "../core/presenter"
import { createInteractor } from "../core/interactor"

const rootReducer = combineReducers({
  [accountSlice.name]: accountSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const createStore = (repository: Repository, presenter: Presenter) => {
  const interactor = createInteractor(repository, presenter)

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => (getDefaultMiddleware({ thunk: { extraArgument: { interactor, presenter } } }))
  })
}

export type Dispatch = ReturnType<typeof createStore>["dispatch"];