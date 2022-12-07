import { createSlice } from "@reduxjs/toolkit"
import { depositMoney } from "./action"

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    balance: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(depositMoney.fulfilled, (state, { payload }) => {
      state.balance = payload
    })
  },
})
