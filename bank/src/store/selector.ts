import { RootState } from "./store"

export const selectBalance = (state: RootState) => {
  return state.account.balance
}
