import { RootState } from "./store"

export const selectBalance = (state: RootState) => {
  return state.account.balance
}

export const selectBalanceHistories = (state: RootState) => {
  return state.account.balanceHistories
}
