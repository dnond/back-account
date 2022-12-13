import { createSlice } from "@reduxjs/toolkit"
import { Repository } from "../core/repository"
import { depositMoney, withdrawMoney } from "./action"

export const createAccountSlice = async (repository: Repository) => {
  const initialBalance = await repository.getBalance()

  return createSlice({
    name: 'account',
    initialState: {
      balance: initialBalance,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(depositMoney.fulfilled, (state, { payload }) => {
        state.balance = payload
      })
      builder.addCase(withdrawMoney.fulfilled, (state, { payload }) => {
        state.balance = payload
      })
    },
  })
}