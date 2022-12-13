import {
  combineReducers,
  configureStore,
  ThunkDispatch,
  EmptyObject,
  AnyAction,
  Store,
  CombinedState
} from "@reduxjs/toolkit"
import { createAccountSlice } from "./slice"
import { Repository } from "../core/repository"
import { Presenter } from "../core/presenter"
import { createInteractor, Interactor } from "../core/interactor"

export const createStore = async (repository: Repository, presenter: Presenter) => {
  const interactor = createInteractor(repository, presenter)
  const accountSlice = await createAccountSlice(repository)
  const rootReducer = combineReducers({
    [accountSlice.name]: accountSlice.reducer,
  })

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => (getDefaultMiddleware({ thunk: { extraArgument: { interactor, presenter } } }))
  })
}

export type AccountStore = Store<CombinedState<{
  account: {
    balance: number;
  };
}>, AnyAction>

export type Dispatch = ThunkDispatch<EmptyObject, {
  interactor: Interactor
  presenter: Presenter
}, AnyAction>

export type RootState = {
  account: {
    balance: number;
  };
}
