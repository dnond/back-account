import { createAsyncThunk } from "@reduxjs/toolkit"
import { Interactor } from "../core/interactor"
import { Presenter } from "../core/presenter"

export const depositMoney = createAsyncThunk<
  number,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/depositMoney", async (depositedMoney, { extra }) => {
  await extra.interactor.deposit(depositedMoney)

  return extra.presenter.getBalance()
})

export const withdrawMoney = createAsyncThunk<
  number,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/withdrawMoney", async (withdrawedMoney, { extra }) => {
  await extra.interactor.withdraw(withdrawedMoney)

  return extra.presenter.getBalance()
})
