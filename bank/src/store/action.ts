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
